import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

dotenv.config({ path: path.join(ROOT, ".env"), quiet: true });

const PORT = Number(process.env.PORT || 5500);
const FOOTBALL_BASE = "https://v3.football.api-sports.io";

const API_KEY_RESOLVED =
  process.env.API_SPORTS_KEY || process.env.API_SPORTS_FOOTBALL_KEY || process.env.API_SPORTS_HOCKEY_KEY || "";


/** Longer idle TTL to stay within ~100 requests/day free tier (few unique dates + polling). */
const IDLE_CACHE_MS = 300_000;
const LIVE_CACHE_MS = 90_000;
const NEG_EMPTY_TTL_MS = 120_000;

const fixturesCache = new Map();
/** @type {Map<string, number>} */
const negEmptyUntil = new Map();
const eventsCache = new Map();

let footballUpstreamUtcDayKey = "";
let footballUpstreamCountToday = 0;

function utcDayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

function bumpUpstreamCount(n) {
  const key = utcDayKey();
  if (key !== footballUpstreamUtcDayKey) {
    footballUpstreamUtcDayKey = key;
    footballUpstreamCountToday = 0;
  }
  footballUpstreamCountToday += n;
  console.log(`[Football API] upstream calls today (UTC): ${footballUpstreamCountToday}/100 (+${n})`);
}

function loadTrackedMatches() {
  const p = path.join(ROOT, "tracked-matches.json");
  if (!fs.existsSync(p)) return [];
  try {
    const raw = JSON.parse(fs.readFileSync(p, "utf8"));
    if (!Array.isArray(raw)) return [];
    return raw.slice(0, 10);
  } catch {
    return [];
  }
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml"
};

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

async function fetchFootball(pathAndQuery) {
  const url = `${FOOTBALL_BASE}${pathAndQuery}`;
  const r = await fetch(url, {
    headers: { "x-apisports-key": API_KEY_RESOLVED }
  });
  const text = await r.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, error: "Invalid JSON from football API", status: r.status, raw: text.slice(0, 200) };
  }
  return { ok: r.ok, status: r.status, data };
}

function simplifyFixtureRow(row) {
  const fx = row.fixture || {};
  const teams = row.teams || {};
  const league = row.league || {};
  const st = fx.status || {};
  return {
    home: teams.home?.name || "",
    away: teams.away?.name || "",
    league: league.name || "",
    status: String(st.short || ""),
    date: fx.date || ""
  };
}

async function handleFootballDebug(res) {
  if (!API_KEY_RESOLVED) {
    console.warn("[Football debug] No API key — returning empty list.");
    sendJson(res, 200, []);
    return;
  }

  const dates = ["2026-03-27", "2026-03-28"];
  const out = [];

  for (const dateKey of dates) {
    const apiRes = await fetchFootball(`/fixtures?date=${encodeURIComponent(dateKey)}`);
    bumpUpstreamCount(1);

    if (!apiRes.ok) {
      console.warn("[Football debug]", dateKey, "HTTP error", apiRes.status, apiRes.error || "");
      continue;
    }
    if (apiRes.data.errors && Object.keys(apiRes.data.errors).length) {
      console.warn("[Football debug]", dateKey, "API errors:", apiRes.data.errors);
      continue;
    }

    const rows = apiRes.data.response || [];
    for (const row of rows) {
      out.push(simplifyFixtureRow(row));
    }
  }

  sendJson(res, 200, out);
}

/** Normalized game for client: goals + fixture.status + minute. */
function normalizeFixture(row) {
  const fx = row.fixture || {};
  const teams = row.teams || {};
  const goals = row.goals || {};
  const st = fx.status || {};
  const rawEvents = Array.isArray(row.events) ? row.events : [];
  const homeName = teams.home?.name || "";
  const awayName = teams.away?.name || "";
  const homeScore = Number(goals.home);
  const awayScore = Number(goals.away);
  const short = String(st.short || "NS");
  const long = String(st.long || "");
  const minute = st.elapsed != null && st.elapsed !== "" ? Number(st.elapsed) : null;

  const goalEvents = rawEvents
    .filter(e => e.type === "Goal")
    .map(e => ({
      min: e.time?.elapsed ?? null,
      extra: e.time?.extra ?? null,
      player: e.player?.name || "?",
      team: e.team?.name || "",
      detail: e.detail || ""
    }));

  return {
    id: fx.id ?? null,
    homeName,
    awayName,
    homeScore: Number.isNaN(homeScore) ? 0 : homeScore,
    awayScore: Number.isNaN(awayScore) ? 0 : awayScore,
    status: short,
    statusShort: short,
    statusLong: long,
    minute: Number.isNaN(minute) ? null : minute,
    date: fx.date || null,
    events: goalEvents.length ? goalEvents : undefined
  };
}

async function enrichWithEvents(normalized, liveMode) {
  if (!normalized?.id) return 0;
  if (normalized.events?.length) return 0;
  const totalGoals = (normalized.homeScore || 0) + (normalized.awayScore || 0);
  if (totalGoals === 0) return 0;

  const scoreKey = `${normalized.homeScore}:${normalized.awayScore}`;
  const cacheKey = `evt-${normalized.id}`;
  const cached = eventsCache.get(cacheKey);
  if (cached && cached.scoreKey === scoreKey && cached.expiresAt > Date.now()) {
    normalized.events = cached.events.length ? cached.events : undefined;
    return 0;
  }

  try {
    const apiRes = await fetchFootball(`/fixtures?id=${normalized.id}`);
    bumpUpstreamCount(1);
    if (apiRes.ok && apiRes.data?.response?.length) {
      const row = apiRes.data.response[0];
      const rawEvents = Array.isArray(row.events) ? row.events : [];
      const goalEvents = rawEvents
        .filter(e => e.type === "Goal")
        .map(e => ({
          min: e.time?.elapsed ?? null,
          extra: e.time?.extra ?? null,
          player: e.player?.name || "?",
          team: e.team?.name || "",
          detail: e.detail || ""
        }));
      const isFinal = ["FT", "AET", "PEN", "AWD", "WO", "ABD"].includes(normalized.statusShort);
      const ttl = isFinal ? 86_400_000 : liveMode ? LIVE_CACHE_MS : IDLE_CACHE_MS;
      eventsCache.set(cacheKey, { events: goalEvents, scoreKey, expiresAt: Date.now() + ttl });
      normalized.events = goalEvents.length ? goalEvents : undefined;
    }
    return 1;
  } catch (err) {
    console.warn(`[Football API] events fetch error for fixture ${normalized.id}:`, err?.message);
    return 0;
  }
}

function includesNorm(hay, needle) {
  if (!hay || !needle) return false;
  const h = hay.toLowerCase();
  const n = needle.toLowerCase();
  return h.includes(n);
}

function hintListFromTrack(track, side) {
  const primary = side === "home" ? track.apiHomeHint : track.apiAwayHint;
  const extra = side === "home" ? track.apiHomeHints : track.apiAwayHints;
  const list = [];
  if (primary) list.push(String(primary).trim());
  if (Array.isArray(extra)) {
    for (const x of extra) {
      if (x) list.push(String(x).trim());
    }
  }
  const seen = new Set();
  return list.filter((h) => {
    const k = h.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function teamMatchesHints(apiName, hints) {
  if (!apiName || !hints.length) return false;
  const name = String(apiName);
  for (const hint of hints) {
    if (!hint) continue;
    if (includesNorm(name, hint)) return true;
    if (includesNorm(hint, name)) return true;
    const hintWords = hint
      .toLowerCase()
      .split(/[\s\-_.]+/)
      .filter((w) => w.length >= 3);
    const nl = name.toLowerCase();
    for (const w of hintWords) {
      if (nl.includes(w)) return true;
    }
  }
  return false;
}

function hintsMentionYouth(hints) {
  return hints.some((h) => /\bu\d{2}\b/i.test(String(h)));
}

function fixtureUsesYouthTeamLabels(homeName, awayName) {
  const y = /\bU\d{2}\b/i;
  return y.test(String(homeName)) || y.test(String(awayName));
}

function findFixtureOnDate(responseRows, homeHints, awayHints) {
  if (!Array.isArray(responseRows)) return null;
  const hh = Array.isArray(homeHints) ? homeHints : [homeHints].filter(Boolean);
  const ah = Array.isArray(awayHints) ? awayHints : [awayHints].filter(Boolean);
  const allowYouth = hintsMentionYouth(hh) || hintsMentionYouth(ah);
  return (
    responseRows.find((row) => {
      const n = normalizeFixture(row);
      if (!allowYouth && fixtureUsesYouthTeamLabels(n.homeName, n.awayName)) return false;
      const hOk = teamMatchesHints(n.homeName, hh) && teamMatchesHints(n.awayName, ah);
      const rOk = teamMatchesHints(n.homeName, ah) && teamMatchesHints(n.awayName, hh);
      return hOk || rOk;
    }) || null
  );
}

function addUtcDayYmd(ymd, deltaDays) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) return ymd;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const dt = new Date(Date.UTC(y, mo - 1, d + deltaDays));
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function dateKeysForTrack(track) {
  const primary = track.apiDate;
  const out = [primary];
  if (track.tryAdjacentDates !== false) {
    out.push(addUtcDayYmd(primary, -1), addUtcDayYmd(primary, 1));
  }
  return [...new Set(out)];
}

function cacheTtlMs(liveMode) {
  return liveMode ? LIVE_CACHE_MS : IDLE_CACHE_MS;
}

function setFixtureCache(dateKey, rows, liveMode) {
  fixturesCache.set(dateKey, {
    fixtures: rows,
    expiresAt: Date.now() + cacheTtlMs(liveMode)
  });
}

async function fetchFixturesForDateSmart(dateKey, liveMode) {
  const now = Date.now();
  const stats = {
    upstreamCalls: 0,
    responseCacheHit: false,
    negativeEmptyHit: false
  };

  if (negEmptyUntil.get(dateKey) > now) {
    stats.negativeEmptyHit = true;
    return { fixtures: [], ...stats };
  }

  const cached = fixturesCache.get(dateKey);
  if (cached && cached.expiresAt > now) {
    stats.responseCacheHit = true;
    return { fixtures: cached.fixtures, ...stats };
  }

  const apiRes = await fetchFootball(`/fixtures?date=${encodeURIComponent(dateKey)}`);
  stats.upstreamCalls += 1;
  bumpUpstreamCount(1);

  if (!apiRes.ok) {
    negEmptyUntil.set(dateKey, now + NEG_EMPTY_TTL_MS);
    setFixtureCache(dateKey, [], liveMode);
    return { fixtures: [], ...stats, error: "Football API HTTP error" };
  }
  if (apiRes.data.errors && Object.keys(apiRes.data.errors).length) {
    negEmptyUntil.set(dateKey, now + NEG_EMPTY_TTL_MS);
    setFixtureCache(dateKey, [], liveMode);
    return { fixtures: [], ...stats, errors: apiRes.data.errors, apiError: true };
  }

  const rows = apiRes.data.response || [];
  if (rows.length) {
    negEmptyUntil.delete(dateKey);
    setFixtureCache(dateKey, rows, liveMode);
    return { fixtures: rows, ...stats };
  }

  negEmptyUntil.set(dateKey, now + NEG_EMPTY_TTL_MS);
  setFixtureCache(dateKey, [], liveMode);
  return { fixtures: [], ...stats };
}

function logTrackedSummary() {}

async function handleFootballTracked(url, res) {
  const liveMode =
    url.searchParams.get("live") === "1" ||
    url.searchParams.get("live") === "true" ||
    url.searchParams.get("liveMode") === "live";

  if (!API_KEY_RESOLVED) {
    return sendJson(res, 200, {
      ok: false,
      configured: false,
      error:
        "Missing API-Football key. Set API_SPORTS_KEY (or API_SPORTS_FOOTBALL_KEY / API_SPORTS_HOCKEY_KEY) in .env.",
      upstreamCallsThisRequest: 0,
      upstreamCallsToday: footballUpstreamCountToday,
      uniqueDatesFetched: 0,
      responseCacheHits: 0,
      negativeEmptyHits: 0,
      upstreamRoundtripGroups: 0,
      liveMode
    });
  }

  const tracked = loadTrackedMatches();
  if (!tracked.length) {
    return sendJson(res, 200, {
      ok: true,
      configured: true,
      tracked: 0,
      results: [],
      upstreamCallsThisRequest: 0,
      upstreamCallsToday: footballUpstreamCountToday,
      uniqueDatesFetched: 0,
      responseCacheHits: 0,
      negativeEmptyHits: 0,
      upstreamRoundtripGroups: 0,
      liveMode
    });
  }

  const dateSet = new Set();
  for (const t of tracked) {
    for (const d of dateKeysForTrack(t)) {
      dateSet.add(d);
    }
  }

  let callsThisRequest = 0;
  let responseCacheHits = 0;
  let negativeEmptyHits = 0;
  let upstreamRoundtripGroups = 0;
  const cacheByDate = new Map();

  const dateWarnings = [];
  for (const dateKey of dateSet) {
    const r = await fetchFixturesForDateSmart(dateKey, liveMode);
    callsThisRequest += r.upstreamCalls;
    if (r.responseCacheHit) responseCacheHits += 1;
    if (r.negativeEmptyHit) negativeEmptyHits += 1;
    if (r.upstreamCalls > 0) upstreamRoundtripGroups += 1;
    if (r.error) {
      console.warn(`[Football API] date ${dateKey}:`, r.error);
      dateWarnings.push({ date: dateKey, error: r.error });
      cacheByDate.set(dateKey, []);
      continue;
    }
    if (r.errors && Object.keys(r.errors).length) {
      console.warn(`[Football API] date ${dateKey} errors:`, r.errors);
      dateWarnings.push({ date: dateKey, errors: r.errors });
      cacheByDate.set(dateKey, []);
      continue;
    }
    cacheByDate.set(dateKey, r.fixtures);
  }

  const POLL_IDLE_SEC = 180;
  const POLL_LIVE_SEC = 60;
  const pollsPerDayModel = (16 * 3600) / POLL_IDLE_SEC + (8 * 3600) / POLL_LIVE_SEC;
  const estimatedDailyUpstreamIfSteady =
    callsThisRequest > 0 ? Math.ceil(pollsPerDayModel * callsThisRequest) : null;
  const estimatedDailyWorstNoDedupe = Math.ceil(pollsPerDayModel * dateSet.size);
  const estimateNote =
    callsThisRequest === 0 && dateSet.size > 0
      ? "This poll used 0 upstream (memory or negative empty cache)."
      : null;

  logTrackedSummary({
    liveMode,
    upstreamCallsThisRequest: callsThisRequest,
    uniqueDatesFetched: dateSet.size,
    responseCacheHits,
    negativeEmptyHits,
    upstreamRoundtripGroups
  });

  const results = [];
  for (const t of tracked) {
    const homeHints = hintListFromTrack(t, "home");
    const awayHints = hintListFromTrack(t, "away");
    const datesTried = dateKeysForTrack(t);
    let raw = null;
    let resolvedDate = null;
    let fixturesSeen = 0;
    for (const d of datesTried) {
      const fixtures = cacheByDate.get(d) || [];
      fixturesSeen += fixtures.length;
      raw = findFixtureOnDate(fixtures, homeHints, awayHints);
      if (raw) {
        resolvedDate = d;
        break;
      }
    }
    const normalized = raw ? normalizeFixture(raw) : null;
    if (normalized) {
      callsThisRequest += await enrichWithEvents(normalized, liveMode);
    }
    const matchDebug = {
      reason: raw ? "matched" : "no_match_on_tried_dates",
      searchedDates: datesTried,
      resolvedDate: resolvedDate || null,
      homeHints,
      awayHints,
      fixturesSeenOnDates: fixturesSeen
    };
    results.push({
      trackId: t.id,
      found: Boolean(raw),
      game: normalized,
      matchDebug
    });
  }

  return sendJson(res, 200, {
    ok: true,
    configured: true,
    tracked: tracked.length,
    results,
    dateWarnings: dateWarnings.length ? dateWarnings : undefined,
    upstreamCallsThisRequest: callsThisRequest,
    upstreamCallsToday: footballUpstreamCountToday,
    uniqueDatesFetched: dateSet.size,
    responseCacheHits,
    negativeEmptyHits,
    upstreamRoundtripGroups,
    liveMode,
    pollingModel: {
      idlePollSec: POLL_IDLE_SEC,
      livePollSec: POLL_LIVE_SEC,
      pollsPerDay16hIdle8hLive: pollsPerDayModel,
      estimatedDailyUpstreamIfSteady,
      estimatedDailyWorstNoDedupe,
      estimateNote
    }
  });
}

function serveStatic(req, res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const type = MIME[ext] || "application/octet-stream";
    /** Avoid stale wallet.bundle.js / index.html when debugging wallet (browser disk cache). */
    const headers =
      ext === ".html" || ext === ".js"
        ? { "Content-Type": type, "Cache-Control": "no-cache" }
        : { "Content-Type": type };
    res.writeHead(200, headers);
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  if (url.pathname === "/api/football/tracked" && req.method === "GET") {
    try {
      await handleFootballTracked(url, res);
    } catch (e) {
      sendJson(res, 500, { ok: false, error: String(e?.message || e) });
    }
    return;
  }

  if (url.pathname === "/api/football/debug" && req.method === "GET") {
    try {
      await handleFootballDebug(res);
    } catch (e) {
      sendJson(res, 500, { ok: false, error: String(e?.message || e) });
    }
    return;
  }

  if (url.pathname === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      footballKey: Boolean(API_KEY_RESOLVED),
      mode: "football"
    });
    return;
  }

  let filePath = path.join(ROOT, path.normalize(url.pathname).replace(/^(\.\.[/\\])+/, ""));
  if (filePath.endsWith("/") || filePath === ROOT) filePath = path.join(ROOT, "index.html");
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end();
    return;
  }
  fs.stat(filePath, (err, st) => {
    if (!err && st.isFile()) {
      serveStatic(req, res, filePath);
      return;
    }
    const fallback = path.join(ROOT, "index.html");
    serveStatic(req, res, fallback);
  });
});

server.listen(PORT, () => {
  console.log(`Prediction League: http://localhost:${PORT}`);
  console.log(
    API_KEY_RESOLVED
      ? "API-Football v3: key loaded."
      : "No API key — live scores disabled. Add API_SPORTS_KEY to .env (see .env.example)."
  );
});
