const STORAGE_PROFILE = "pl_profile_v1";
const STORAGE_PREDS = "pl_predictions_v1";
const STORAGE_SETTLED = "pl_settled_games_v1";
const STORAGE_RESULTS = "pl_match_results_v1";
const STORAGE_RESET_VERSION = "pl_reset_v";
const CURRENT_RESET = 2;

function mHome(match) {
  return match?.homeTeam ?? match?.home ?? "";
}

function mAway(match) {
  return match?.awayTeam ?? match?.away ?? "";
}

function T(key, vars) {
  return typeof plTranslate === "function" ? plTranslate(key, vars) : key;
}

const MARKET_COUNT = 4;

const COUNTRY_FLAGS = {
  Switzerland: "🇨🇭", Germany: "🇩🇪", Netherlands: "🇳🇱", Norway: "🇳🇴",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", Uruguay: "🇺🇾", Spain: "🇪🇸", Serbia: "🇷🇸",
  Austria: "🇦🇹", Ghana: "🇬🇭", France: "🇫🇷", Italy: "🇮🇹",
  Brazil: "🇧🇷", Argentina: "🇦🇷", Portugal: "🇵🇹", Belgium: "🇧🇪",
  Croatia: "🇭🇷", Denmark: "🇩🇰", Poland: "🇵🇱", Sweden: "🇸🇪",
  USA: "🇺🇸", Mexico: "🇲🇽", Japan: "🇯🇵", "South Korea": "🇰🇷",
  Australia: "🇦🇺", Canada: "🇨🇦", Wales: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  Turkey: "🇹🇷", Ukraine: "🇺🇦", "Czech Republic": "🇨🇿", Romania: "🇷🇴",
  Colombia: "🇨🇴", Chile: "🇨🇱", Peru: "🇵🇪", Ecuador: "🇪🇨",
  Morocco: "🇲🇦", Senegal: "🇸🇳", Nigeria: "🇳🇬", Cameroon: "🇨🇲",
  Tunisia: "🇹🇳", "Saudi Arabia": "🇸🇦", Iran: "🇮🇷", Qatar: "🇶🇦",
  "Costa Rica": "🇨🇷", Panama: "🇵🇦", Jamaica: "🇯🇲",
  Hungary: "🇭🇺", Greece: "🇬🇷", Finland: "🇫🇮", Ireland: "🇮🇪",
  Iceland: "🇮🇸", Albania: "🇦🇱", "Bosnia and Herzegovina": "🇧🇦",
  Montenegro: "🇲🇪", "North Macedonia": "🇲🇰", Slovenia: "🇸🇮",
  Armenia: "🇦🇲", Belarus: "🇧🇾", Lithuania: "🇱🇹", Georgia: "🇬🇪",
  Slovakia: "🇸🇰", Bulgaria: "🇧🇬", Paraguay: "🇵🇾", Venezuela: "🇻🇪"
};

function teamFlag(name) {
  return COUNTRY_FLAGS[name] || "";
}

function fmtGoalMin(min, extra) {
  if (min == null) return "";
  return extra ? `${min}+${extra}'` : `${min}'`;
}

function goalTag(ev) {
  const min = fmtGoalMin(ev.min, ev.extra);
  const d = (ev.detail || "").toLowerCase();
  const suffix = d.includes("own") ? " (og)" : d.includes("pen") ? " (pen)" : "";
  return `${ev.player} ${min}${suffix}`;
}

function buildGoalsHtml(game) {
  if (!game?.events?.length) return "";
  const home = game.events.filter(e => e.team === game.homeName);
  const away = game.events.filter(e => e.team === game.awayName);
  let html = "";
  if (home.length) html += `<div class="goal-line"><span class="goal-icon">⚽</span> ${home.map(goalTag).join(", ")}</div>`;
  if (away.length) html += `<div class="goal-line"><span class="goal-icon">⚽</span> ${away.map(goalTag).join(", ")}</div>`;
  return html;
}

const matches = [
  {
    id: 313,
    type: "football",
    liveApi: true,
    league: "AFC Champions League",
    homeTeam: "Al Nassr",
    awayTeam: "Al Najma",
    apiDate: "2026-04-03",
    date: "03 Apr 2026, 17:00 UTC",
    kickoffMs: Date.parse("2026-04-03T17:00:00+00:00"),
    apiHomeHints: ["Al Nassr", "Al-Nassr"],
    apiAwayHints: ["Al Najma", "Al-Najma"]
  },
  {
    id: 314,
    type: "football",
    liveApi: true,
    league: "Ligue 1",
    homeTeam: "Paris Saint Germain",
    awayTeam: "Toulouse",
    apiDate: "2026-04-03",
    date: "03 Apr 2026, 19:00 UTC",
    kickoffMs: Date.parse("2026-04-03T19:00:00+00:00"),
    apiHomeHints: ["Paris Saint Germain", "Paris Saint-Germain", "PSG"],
    apiAwayHints: ["Toulouse", "Toulouse FC"]
  },
  {
    id: 315,
    type: "football",
    liveApi: true,
    league: "Liga Portugal",
    homeTeam: "Sporting CP",
    awayTeam: "Santa Clara",
    apiDate: "2026-04-03",
    date: "03 Apr 2026, 20:15 UTC",
    kickoffMs: Date.parse("2026-04-03T20:15:00+00:00"),
    apiHomeHints: ["Sporting CP", "Sporting", "Sporting Lisbon"],
    apiAwayHints: ["Santa Clara", "CD Santa Clara"]
  },
  {
    id: 316,
    type: "football",
    liveApi: true,
    league: "Serie A (Brazil)",
    homeTeam: "Santos",
    awayTeam: "Remo",
    apiDate: "2026-04-03",
    date: "03 Apr 2026, 22:00 UTC",
    kickoffMs: Date.parse("2026-04-03T22:00:00+00:00"),
    apiHomeHints: ["Santos", "Santos FC"],
    apiAwayHints: ["Remo", "Clube do Remo"]
  },
  {
    id: 317,
    type: "football",
    liveApi: true,
    league: "Serie A (Brazil)",
    homeTeam: "Palmeiras",
    awayTeam: "Gremio",
    apiDate: "2026-04-03",
    date: "03 Apr 2026, 23:30 UTC",
    kickoffMs: Date.parse("2026-04-03T23:30:00+00:00"),
    apiHomeHints: ["Palmeiras", "SE Palmeiras"],
    apiAwayHints: ["Gremio", "Grêmio"]
  },
  {
    id: 309,
    type: "football",
    liveApi: true,
    archived: true,
    league: "Friendlies",
    homeTeam: "Mexico",
    awayTeam: "Portugal",
    apiDate: "2026-03-29",
    date: "29 Mar 2026, 04:00 UTC",
    kickoffMs: Date.parse("2026-03-29T04:00:00+00:00"),
    apiHomeHints: ["Mexico"],
    apiAwayHints: ["Portugal"]
  },
  {
    id: 310,
    type: "football",
    liveApi: true,
    archived: true,
    league: "Friendlies",
    homeTeam: "Armenia",
    awayTeam: "Belarus",
    apiDate: "2026-03-29",
    date: "29 Mar 2026, 16:00 UTC",
    kickoffMs: Date.parse("2026-03-29T16:00:00+00:00"),
    apiHomeHints: ["Armenia"],
    apiAwayHints: ["Belarus"]
  },
  {
    id: 311,
    type: "football",
    liveApi: true,
    archived: true,
    league: "Friendlies",
    homeTeam: "Lithuania",
    awayTeam: "Georgia",
    apiDate: "2026-03-29",
    date: "29 Mar 2026, 16:00 UTC",
    kickoffMs: Date.parse("2026-03-29T16:00:00+00:00"),
    apiHomeHints: ["Lithuania"],
    apiAwayHints: ["Georgia"]
  },
  {
    id: 312,
    type: "football",
    liveApi: true,
    archived: true,
    league: "Friendlies",
    homeTeam: "Colombia",
    awayTeam: "France",
    apiDate: "2026-03-29",
    date: "29 Mar 2026, 22:00 UTC",
    kickoffMs: Date.parse("2026-03-29T22:00:00+00:00"),
    apiHomeHints: ["Colombia"],
    apiAwayHints: ["France"]
  },
  {
    id: 306,
    type: "football",
    liveApi: true,
    archived: true,
    league: "Friendlies",
    homeTeam: "Scotland",
    awayTeam: "Japan",
    apiDate: "2026-03-28",
    date: "28 Mar 2026, 17:00 UTC",
    kickoffMs: Date.parse("2026-03-28T17:00:00+00:00"),
    apiHomeHints: ["Scotland"],
    apiAwayHints: ["Japan"]
  },
  {
    id: 307,
    type: "football",
    liveApi: true,
    archived: true,
    league: "Friendlies",
    homeTeam: "Hungary",
    awayTeam: "Slovenia",
    apiDate: "2026-03-28",
    date: "28 Mar 2026, 17:00 UTC",
    kickoffMs: Date.parse("2026-03-28T17:00:00+00:00"),
    apiHomeHints: ["Hungary"],
    apiAwayHints: ["Slovenia"]
  },
  {
    id: 308,
    type: "football",
    liveApi: true,
    archived: true,
    league: "Friendlies",
    homeTeam: "USA",
    awayTeam: "Belgium",
    apiDate: "2026-03-28",
    date: "28 Mar 2026, 19:30 UTC",
    kickoffMs: Date.parse("2026-03-28T19:30:00+00:00"),
    apiHomeHints: ["USA", "United States"],
    apiAwayHints: ["Belgium"]
  },
  {
    id: 301,
    type: "football",
    liveApi: true,
    archived: true,
    homeTeam: "Switzerland",
    awayTeam: "Germany",
    league: "Friendlies",
    apiDate: "2026-03-27",
    date: "27 Mar 2026, 19:45 UTC",
    kickoffMs: Date.parse("2026-03-27T19:45:00+00:00"),
    apiHomeHints: ["Switzerland"],
    apiAwayHints: ["Germany"]
  },
  {
    id: 302,
    type: "football",
    liveApi: true,
    archived: true,
    homeTeam: "Netherlands",
    awayTeam: "Norway",
    league: "Friendlies",
    apiDate: "2026-03-27",
    date: "27 Mar 2026, 19:45 UTC",
    kickoffMs: Date.parse("2026-03-27T19:45:00+00:00"),
    apiHomeHints: ["Netherlands"],
    apiAwayHints: ["Norway"]
  },
  {
    id: 303,
    type: "football",
    liveApi: true,
    archived: true,
    homeTeam: "England",
    awayTeam: "Uruguay",
    league: "Friendlies",
    apiDate: "2026-03-27",
    date: "27 Mar 2026, 19:45 UTC",
    kickoffMs: Date.parse("2026-03-27T19:45:00+00:00"),
    apiHomeHints: ["England"],
    apiAwayHints: ["Uruguay"]
  },
  {
    id: 304,
    type: "football",
    liveApi: true,
    archived: true,
    homeTeam: "Spain",
    awayTeam: "Serbia",
    league: "Friendlies",
    apiDate: "2026-03-27",
    date: "27 Mar 2026, 20:00 UTC",
    kickoffMs: Date.parse("2026-03-27T20:00:00+00:00"),
    apiHomeHints: ["Spain"],
    apiAwayHints: ["Serbia"]
  },
  {
    id: 305,
    type: "football",
    liveApi: true,
    archived: true,
    homeTeam: "Austria",
    awayTeam: "Ghana",
    league: "Friendlies",
    apiDate: "2026-03-27",
    date: "27 Mar 2026, 17:00 UTC",
    kickoffMs: Date.parse("2026-03-27T17:00:00+00:00"),
    apiHomeHints: ["Austria"],
    apiAwayHints: ["Ghana"]
  }
];

const state = {
  selectedMatch: null,
  outcome: "",
  score: { home: 1, away: 1 },
  totalGoals: "",
  firstToScore: "",
  confidence: "",
  countdownSeconds: 0,
  matchCountdowns: {},
  liveSnapshot: null,
  liveSnapshotsByMatchId: {},
  livePollingStopped: false,
  liveContextForNextPoll: false,
  apiConfigured: null
};

const matchesView = document.getElementById("matchesView");
const predictionView = document.getElementById("predictionView");
const myBetsView = document.getElementById("myBetsView");
const myBetsList = document.getElementById("myBetsList");
const leaderboardView = document.getElementById("leaderboardView");
const leaderboardBody = document.getElementById("leaderboardBody");
const profileView = document.getElementById("profileView");
const profileContent = document.getElementById("profileContent");
const matchesList = document.getElementById("matchesList");
const backBtn = document.getElementById("backBtn");
const toast = document.getElementById("toast");

const matchHeaderTitle = document.getElementById("matchHeaderTitle");
const matchHeaderDate = document.getElementById("matchHeaderDate");
const homeBadge = document.getElementById("homeBadge");
const awayBadge = document.getElementById("awayBadge");
const homeName = document.getElementById("homeName");
const awayName = document.getElementById("awayName");
const homeScoreLabel = document.getElementById("homeScoreLabel");
const awayScoreLabel = document.getElementById("awayScoreLabel");
const homeScoreValue = document.getElementById("homeScoreValue");
const awayScoreValue = document.getElementById("awayScoreValue");

const outcomeOptions = document.getElementById("outcomeOptions");
const totalGoalsOptions = document.getElementById("totalGoalsOptions");
const firstToScoreOptions = document.getElementById("firstToScoreOptions");
const confidenceOptions = document.getElementById("confidenceOptions");

const selectedSummary = document.getElementById("selectedSummary");
const progressBar = document.getElementById("progressBar");
const actionSelected = document.getElementById("actionSelected");
const actionConfidence = document.getElementById("actionConfidence");
const submitBtn = document.getElementById("submitBtn");
const countdownText = document.getElementById("countdownText");
const countdownPill = document.getElementById("countdownPill");
const progressPanel = document.getElementById("progressPanel");
const heroLevel = document.getElementById("heroLevel");
const heroRankMeta = document.getElementById("heroRankMeta");
const heroXpFillBar = document.getElementById("heroXpFillBar");
const heroXpSub = document.getElementById("heroXpSub");
const liveScoreBanner = document.getElementById("liveScoreBanner");
const liveScoreBannerText = document.getElementById("liveScoreBannerText");
const notifHeaderBtn = document.getElementById("notifHeaderBtn");
const notifBadge = document.getElementById("notifBadge");

let countdownIntervalId = null;
let matchesCountdownIntervalId = null;
let livePollTimeoutId = null;

const POLL_MS_IDLE = 180000;
const POLL_MS_LIVE = 60000;

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_PROFILE) || '{"nickname":"","xp":0}');
  } catch {
    return { nickname: "", xp: 0 };
  }
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profile));
}

function loadPredictions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_PREDS) || "{}");
  } catch {
    return {};
  }
}

function savePredictions(map) {
  localStorage.setItem(STORAGE_PREDS, JSON.stringify(map));
}

function loadSettled() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_SETTLED) || "[]");
  } catch {
    return [];
  }
}

function saveSettled(ids) {
  localStorage.setItem(STORAGE_SETTLED, JSON.stringify(ids));
}

function loadMatchResults() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_RESULTS) || "{}");
  } catch {
    return {};
  }
}
function saveMatchResult(match, game) {
  if (!game || game.noData) return;
  const key = predictionStorageKey(match);
  const results = loadMatchResults();
  results[key] = {
    homeScore: game.homeScore,
    awayScore: game.awayScore,
    statusShort: game.statusShort || game.status,
    statusLong: game.statusLong || "",
    homeName: game.homeName,
    awayName: game.awayName,
    events: game.events || []
  };
  localStorage.setItem(STORAGE_RESULTS, JSON.stringify(results));
}
function getMatchGameData(match) {
  const live = state.liveSnapshotsByMatchId[match.id];
  if (live && !live.noData) return live;
  const results = loadMatchResults();
  const key = predictionStorageKey(match);
  return results[key] || null;
}

(function oneTimeReset() {
  const v = Number(localStorage.getItem(STORAGE_RESET_VERSION)) || 0;
  if (v < CURRENT_RESET) {
    const raw = localStorage.getItem(STORAGE_PROFILE);
    if (raw) {
      try {
        const p = JSON.parse(raw);
        p.xp = 0;
        localStorage.setItem(STORAGE_PROFILE, JSON.stringify(p));
      } catch { /* ignore */ }
    }
    localStorage.setItem(STORAGE_RESET_VERSION, String(CURRENT_RESET));
  }
})();

function predictionStorageKey(match) {
  if (match?.liveApi) {
    return `fb-${match.id}-${match.apiDate || ""}`.toLowerCase();
  }
  return `${match.type || "static"}-${match.id}`;
}

function updateHeroXp() {
  const profile = loadProfile();
  const xp = Number(profile.xp) || 0;
  const level = Math.floor(xp / 2000) + 1;
  const inLevel = xp % 2000;
  if (heroLevel) heroLevel.textContent = T("heroLevel", { n: level });
  if (heroRankMeta) {
    const loc = typeof plGetLocale === "function" ? plGetLocale() : "en";
    heroRankMeta.textContent = T("heroXpOnly", {
      xp: xp.toLocaleString(loc === "ru" ? "ru-RU" : "en-US")
    });
  }
  if (heroXpFillBar) heroXpFillBar.style.width = `${(inLevel / 2000) * 100}%`;
}

function isFootballLiveStatus(short) {
  const u = String(short || "").trim().toUpperCase();
  return ["LIVE", "1H", "2H", "HT", "ET", "BT", "P", "INT", "SUSP"].includes(u);
}

function isFinalFootballStatus(short, long) {
  const u = (short || "").toUpperCase();
  const l = (long || "").toLowerCase();
  if (["FT", "AET", "PEN", "AWD", "WO", "ABD"].includes(u)) return true;
  if (u.includes("FT") || u.includes("FIN")) return true;
  if (l.includes("finished") || l.includes("full time")) return true;
  return false;
}

function actualOutcome(homeGoals, awayGoals) {
  if (homeGoals > awayGoals) return "home";
  if (awayGoals > homeGoals) return "away";
  return "draw";
}

function computeXpBreakdown(pred, homeGoals, awayGoals) {
  let xp = 0;
  const parts = [];
  const mult = (key) => (pred.confidence === key ? 2 : 1);

  const ao = actualOutcome(homeGoals, awayGoals);
  if (pred.outcome === ao) {
    const add = 40 * mult("outcome");
    xp += add;
    parts.push(T("xpOutcome", { n: add }));
  }

  if (Number(pred.scoreHome) === homeGoals && Number(pred.scoreAway) === awayGoals) {
    const add = 100 * mult("score");
    xp += add;
    parts.push(T("xpExact", { n: add }));
  }

  const totalGoals = homeGoals + awayGoals;
  const overActual = totalGoals > 2.5;
  const predOver = pred.totalGoals === "over_2_5";
  if (pred.totalGoals && predOver === overActual) {
    const add = 30 * mult("total");
    xp += add;
    parts.push(T("xpTotal", { n: add }));
  }

  if (pred.firstToScore === "none" && totalGoals === 0) {
    const add = 25 * mult("first");
    xp += add;
    parts.push(T("xpFirst", { n: add }));
  }

  return { xp, parts };
}

function settleLivePredictionIfNeeded(game, match) {
  if (!game || game.noData || !match?.liveApi) return;
  const key = predictionStorageKey(match);
  const settled = new Set(loadSettled());
  if (settled.has(key)) return;
  if (!isFinalFootballStatus(game.statusShort, game.statusLong)) return;

  const preds = loadPredictions();
  const pred = preds[key];
  if (!pred) return;

  const h = Number(game.homeScore) || 0;
  const a = Number(game.awayScore) || 0;
  const { xp, parts } = computeXpBreakdown(pred, h, a);

  const profile = loadProfile();
  profile.xp = (Number(profile.xp) || 0) + xp;
  saveProfile(profile);

  settled.add(key);
  saveSettled([...settled]);

  updateHeroXp();
  showToast(xp > 0 ? T("matchEndXp", { xp, parts: parts.join(", ") }) : T("matchEndNoXp"));
}

function updateMatchCardVisualState(matchId, game, match) {
  const card = document.querySelector(`[data-match-card="${matchId}"]`);
  if (!card) return;
  let live = false;
  let final = false;
  if (match?.liveApi && game && !game.noData) {
    live = isFootballLiveStatus(game.statusShort || game.status);
    final = isFinalFootballStatus(game.statusShort, game.statusLong);
  }
  card.classList.toggle("match-card-live", live);
  card.classList.toggle("match-card-final", final);
}

function updateMatchCardContext(match, game) {
  const el = document.querySelector(`[data-match-context="${match.id}"]`);
  if (!el) return;

  if (!match.liveApi) {
    const t = match.kickoffMs && match.kickoffMs > Date.now() ? formatStartsIn(match.kickoffMs) : "";
    el.textContent = t;
    el.hidden = !t;
    return;
  }

  if (!game || game.noData) {
    const t = match.kickoffMs && match.kickoffMs > Date.now() ? formatStartsIn(match.kickoffMs) : "";
    el.textContent = t;
    el.hidden = !t;
    return;
  }

  const shortRaw = game.statusShort || game.status || "";
  const live = isFootballLiveStatus(shortRaw);
  const final = isFinalFootballStatus(game.statusShort, game.statusLong);

  if (final) {
    el.textContent = "";
    el.hidden = true;
    return;
  }

  if (live) {
    const minute =
      game.minute != null && game.minute !== "" && !Number.isNaN(Number(game.minute))
        ? `${game.minute}'`
        : "";
    el.textContent = minute || T("statusLive");
    el.hidden = false;
    return;
  }

  const t = match.kickoffMs && match.kickoffMs > Date.now() ? formatStartsIn(match.kickoffMs) : "";
  el.textContent = t;
  el.hidden = !t;
}

function syncMatchCardPillClass(pill, live, final, noData) {
  if (!pill) return;
  pill.classList.remove("status-pill-live", "status-pill-final", "status-pill-upcoming", "status-pill-warn");
  if (noData) pill.classList.add("status-pill-warn");
  else if (live) pill.classList.add("status-pill-live");
  else if (final) pill.classList.add("status-pill-final");
  else pill.classList.add("status-pill-upcoming");
}

function applyLiveGameToCards(game, match) {
  if (!match?.liveApi) return;
  const card = document.querySelector(`[data-match-card="${match.id}"]`);
  if (!card) return;
  const row = card.querySelector("[data-live-row]");
  const pill = card.querySelector(`[data-status-pill="${match.id}"]`);
  const scoreEl = card.querySelector("[data-live-score]");
  if (!row) return;

  if (game?.noData) {
    if (scoreEl) scoreEl.textContent = "— : —";
    row.classList.add("is-waiting");
    if (pill) {
      pill.textContent = T("statusNoDataPill");
      syncMatchCardPillClass(pill, false, false, true);
    }
    const goalsNoData = card.querySelector(`[data-match-goals="${match.id}"]`);
    if (goalsNoData) goalsNoData.innerHTML = "";
    updateMatchCardVisualState(match.id, game, match);
    updateMatchCardContext(match, game);
    return;
  }

  const shortRaw = game.statusShort || game.status || "";
  const short = shortRaw.toUpperCase();
  const live = isFootballLiveStatus(shortRaw);
  const final = isFinalFootballStatus(game.statusShort, game.statusLong);

  const hs = game.homeScore != null && game.homeScore !== "" ? game.homeScore : "—";
  const as = game.awayScore != null && game.awayScore !== "" ? game.awayScore : "—";
  if (scoreEl) scoreEl.textContent = `${hs} : ${as}`;

  row.classList.toggle("is-waiting", !live && !final);

  if (pill) {
    pill.textContent = live
      ? T("statusLive")
      : short === "NS"
        ? T("statusUpcoming")
        : final
          ? T("statusFinal")
          : short || T("statusRaw");
    syncMatchCardPillClass(pill, live, final, false);
  }

  const goalsEl = card.querySelector(`[data-match-goals="${match.id}"]`);
  if (goalsEl) goalsEl.innerHTML = buildGoalsHtml(game);

  updateMatchCardVisualState(match.id, game, match);
  updateMatchCardContext(match, game);
}

function updatePredictionLiveBanner(game, match) {
  const predGoals = document.getElementById("predGoalsList");
  if (!liveScoreBanner || !liveScoreBannerText) return;
  if (!state.selectedMatch || state.selectedMatch.id !== match.id || !game || game.noData) {
    liveScoreBanner.classList.add("is-hidden");
    if (predGoals) { predGoals.innerHTML = ""; predGoals.classList.add("is-hidden"); }
    return;
  }
  const live = isFootballLiveStatus(game.statusShort || game.status);
  if (!live && !isFinalFootballStatus(game.statusShort, game.statusLong)) {
    liveScoreBanner.classList.add("is-hidden");
    if (predGoals) { predGoals.innerHTML = ""; predGoals.classList.add("is-hidden"); }
    return;
  }
  liveScoreBanner.classList.remove("is-hidden");
  const label = live ? T("bannerLive") : T("bannerFinal");
  const hs = game.homeScore != null && game.homeScore !== "" ? game.homeScore : "—";
  const as = game.awayScore != null && game.awayScore !== "" ? game.awayScore : "—";
  const min =
    live && game.minute != null && game.minute !== "" ? ` · ${game.minute}'` : "";
  liveScoreBannerText.textContent = `${label}${min} ${hs} — ${as}`;
  if (predGoals) {
    const gHtml = buildGoalsHtml(game);
    predGoals.innerHTML = gHtml;
    predGoals.classList.toggle("is-hidden", !gHtml);
  }
}

function getLiveTrackedMatches() {
  return matches.filter((m) => m.liveApi === true && !m.archived).slice(0, 5);
}

function isStatusLive(short) {
  return isFootballLiveStatus(short);
}

function allTrackedMatchesFinished(tracked, snapshotsById) {
  if (!tracked.length) return false;
  return tracked.every((m) => {
    const g = snapshotsById[m.id];
    if (!g || g.noData) return false;
    return isFinalFootballStatus(g.statusShort, g.statusLong);
  });
}

function anyTrackedMatchLive(tracked, snapshotsById) {
  return tracked.some((m) => {
    const g = snapshotsById[m.id];
    return g && !g.noData && isStatusLive(g.statusShort || g.status);
  });
}

function clearLivePollTimer() {
  if (livePollTimeoutId != null) {
    clearTimeout(livePollTimeoutId);
    livePollTimeoutId = null;
  }
}

function logLivePollUsage() {}

function scheduleNextLivePoll(tracked, delayMs) {
  clearLivePollTimer();
  if (!tracked.length || state.livePollingStopped) return;
  livePollTimeoutId = setTimeout(() => {
    livePollTimeoutId = null;
    void runTrackedLivePoll();
  }, delayMs);
}

function refreshLiveCardsFromState() {
  for (const m of getLiveTrackedMatches()) {
    const g = state.liveSnapshotsByMatchId[m.id];
    if (g) applyLiveGameToCards(g, m);
  }
}

async function runTrackedLivePoll() {
  const tracked = getLiveTrackedMatches();
  if (!tracked.length || state.livePollingStopped) return;

  let nextMs = POLL_MS_IDLE;
  let payload = null;

  try {
    const liveQ = state.liveContextForNextPoll ? "1" : "0";
    const response = await fetch(`/api/football/tracked?live=${liveQ}`);
    payload = await response.json();

    if (payload.configured === false) {
      state.apiConfigured = false;
      for (const m of tracked) {
        state.liveSnapshotsByMatchId[m.id] = { noData: true };
        applyLiveGameToCards({ noData: true }, m);
      }
      logLivePollUsage(payload, tracked, false, POLL_MS_IDLE);
      scheduleNextLivePoll(tracked, POLL_MS_IDLE);
      return;
    }

    state.apiConfigured = true;

    if (payload.tracked === 0 && getLiveTrackedMatches().length) {
      console.warn(
        "[PL LivePoll] tracked-matches.json is empty but UI has live matches — add up to 5 rows."
      );
    }

    if (payload.ok && Array.isArray(payload.results)) {
      for (const row of payload.results) {
        const match = matches.find((m) => m.id === row.trackId && m.liveApi);
        if (!match) continue;
        if (row.found && row.game) {
          state.liveSnapshotsByMatchId[match.id] = row.game;
          saveMatchResult(match, row.game);
          checkMatchStartNotifications(row.game, match);
          applyLiveGameToCards(row.game, match);
          settleLivePredictionIfNeeded(row.game, match);
        } else {
          state.liveSnapshotsByMatchId[match.id] = { noData: true };
          applyLiveGameToCards({ noData: true }, match);
        }
      }
    }

    if (state.selectedMatch?.liveApi) {
      state.liveSnapshot = state.liveSnapshotsByMatchId[state.selectedMatch.id] || null;
      updatePredictionLiveBanner(state.liveSnapshot, state.selectedMatch);
      if (isMatchStarted(state.selectedMatch) && predictionView?.classList.contains("active")) {
        setFormLocked(true);
        const final = isMatchFinal(state.selectedMatch);
        submitBtn.disabled = true;
        submitBtn.textContent = final ? T("predLockedFinal") : T("predLocked");
        if (countdownPill) countdownPill.classList.add("is-hidden");
      }
    }

    state.liveContextForNextPoll = anyTrackedMatchLive(tracked, state.liveSnapshotsByMatchId);

    const snapshots = state.liveSnapshotsByMatchId;
    if (allTrackedMatchesFinished(tracked, snapshots)) {
      state.livePollingStopped = true;
      clearLivePollTimer();
      logLivePollUsage(payload, tracked, true, null);
      return;
    }

    nextMs = anyTrackedMatchLive(tracked, snapshots) ? POLL_MS_LIVE : POLL_MS_IDLE;
    logLivePollUsage(payload, tracked, false, nextMs);
  } catch {
    state.apiConfigured = null;
    console.warn("[PL LivePoll] Request failed; retrying on idle interval.");
    nextMs = POLL_MS_IDLE;
  }

  scheduleNextLivePoll(tracked, nextMs);
}

function startLivePolling() {
  const tracked = getLiveTrackedMatches();
  if (!tracked.length) return;
  state.livePollingStopped = false;
  clearLivePollTimer();
  void runTrackedLivePoll();
}

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function formatStartsIn(kickoffMs) {
  if (!kickoffMs) return "";
  const ms = kickoffMs - Date.now();
  if (ms <= 0) return T("startsInSoon");
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  if (days >= 2) return T("startsInDays", { n: days });
  if (days === 1) return T("startsInOneDay");
  if (hours >= 1) return T("startsInHours", { n: hours });
  const mins = Math.max(1, Math.ceil(ms / 60000));
  return T("startsInMins", { n: mins });
}

function isMatchStarted(match) {
  if (!match?.kickoffMs) return false;
  return Date.now() >= match.kickoffMs;
}

function isMatchFinal(match) {
  if (!match?.liveApi) return false;
  const g = state.liveSnapshotsByMatchId[match.id];
  return g && !g.noData && isFinalFootballStatus(g.statusShort, g.statusLong);
}

function loadSavedPrediction(match) {
  const key = predictionStorageKey(match);
  const preds = loadPredictions();
  return preds[key] || null;
}

function restorePredictionToState(pred) {
  if (!pred) return;
  state.outcome = pred.outcome || "";
  state.score = {
    home: pred.scoreHome != null ? Number(pred.scoreHome) : 1,
    away: pred.scoreAway != null ? Number(pred.scoreAway) : 1
  };
  state.totalGoals = pred.totalGoals || "";
  state.firstToScore = pred.firstToScore || "";
  state.confidence = pred.confidence || "";
}

function applySelectedButtons() {
  if (state.outcome) {
    outcomeOptions.querySelectorAll(".segment-btn").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.value === state.outcome);
    });
  }
  if (state.totalGoals) {
    totalGoalsOptions.querySelectorAll(".segment-btn").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.value === state.totalGoals);
    });
  }
  if (state.firstToScore) {
    firstToScoreOptions.querySelectorAll(".segment-btn").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.value === state.firstToScore);
    });
  }
}

function setFormLocked(locked) {
  const form = document.getElementById("predictionForm");
  if (!form) return;
  form.classList.toggle("pred-locked", locked);
  form.querySelectorAll("button").forEach((btn) => {
    if (locked) btn.setAttribute("disabled", "");
    else btn.removeAttribute("disabled");
  });
}

function formatPredOutcome(pred, match) {
  if (!pred?.outcome) return "—";
  if (pred.outcome === "home") return T("betOutcomeHome", { team: mHome(match) });
  if (pred.outcome === "away") return T("betOutcomeAway", { team: mAway(match) });
  return T("betOutcomeDraw");
}

function formatPredTotal(pred) {
  if (!pred?.totalGoals) return "—";
  return pred.totalGoals === "over_2_5" ? T("betTotalOver") : T("betTotalUnder");
}

function formatPredFirst(pred, match) {
  if (!pred?.firstToScore) return "—";
  if (pred.firstToScore === "home") return T("betFirstHome", { team: mHome(match) });
  if (pred.firstToScore === "away") return T("betFirstAway", { team: mAway(match) });
  return T("betFirstNone");
}

function formatPredConfidence(pred, match) {
  if (!pred?.confidence) return "—";
  const labels = { outcome: T("betOutcome"), score: T("betScore"), total: T("betTotal"), first: T("betFirst") };
  return labels[pred.confidence] || "—";
}

function getBetMatchStatus(match) {
  const g = getMatchGameData(match);
  if (g) {
    if (isFinalFootballStatus(g.statusShort, g.statusLong)) return "final";
    if (isFootballLiveStatus(g.statusShort || g.status)) return "live";
  }
  if (match.archived) return "final";
  if (isMatchStarted(match)) return "live";
  return "upcoming";
}

function getBetXpInfo(match, pred) {
  const key = predictionStorageKey(match);
  const settled = new Set(loadSettled());
  const g = getMatchGameData(match);

  if (!settled.has(key)) {
    if (g && isFinalFootballStatus(g.statusShort, g.statusLong)) {
      const h = Number(g.homeScore) || 0;
      const a = Number(g.awayScore) || 0;
      const { xp, parts } = computeXpBreakdown(pred, h, a);
      return { settled: true, xp, parts, pending: false };
    }
    if (match.archived && g) {
      const h = Number(g.homeScore) || 0;
      const a = Number(g.awayScore) || 0;
      const { xp, parts } = computeXpBreakdown(pred, h, a);
      return { settled: true, xp, parts, pending: false };
    }
    return { settled: false, xp: 0, parts: [], pending: true };
  }

  if (g) {
    const h = Number(g.homeScore) || 0;
    const a = Number(g.awayScore) || 0;
    const { xp, parts } = computeXpBreakdown(pred, h, a);
    return { settled: true, xp, parts, pending: false };
  }
  return { settled: true, xp: 0, parts: [], pending: false };
}

function renderMyBets() {
  if (!myBetsList) return;
  myBetsList.innerHTML = "";
  const preds = loadPredictions();

  const seen = new Set();
  const allBetMatches = [];

  for (const m of matches) {
    const key = predictionStorageKey(m);
    const hasPred = Boolean(preds[key]);
    if (hasPred || m.archived) {
      const uid = `${m.id}-${m.apiDate}`;
      if (!seen.has(uid)) {
        seen.add(uid);
        allBetMatches.push(m);
      }
    }
  }

  if (!allBetMatches.length) {
    myBetsList.innerHTML = `<p class="my-bets-empty">${T("myBetsEmpty")}</p>`;
    return;
  }

  allBetMatches.sort((a, b) => (b.kickoffMs || 0) - (a.kickoffMs || 0));

  for (const match of allBetMatches) {
    const key = predictionStorageKey(match);
    const pred = preds[key] || null;
    const status = getBetMatchStatus(match);
    const g = getMatchGameData(match);

    const card = document.createElement("article");
    card.className = "my-bet-card panel";
    card.dataset.betMatchId = String(match.id);

    const statusLabel =
      status === "final" ? T("betStatusFinal")
        : status === "live" ? T("betStatusLive")
          : T("betStatusUpcoming");
    const statusClass =
      status === "final" ? "bet-status-final"
        : status === "live" ? "bet-status-live"
          : "bet-status-upcoming";

    const scoreText = g
      ? `${g.homeScore ?? "—"} : ${g.awayScore ?? "—"}`
      : "— : —";

    let xpText, xpClass;
    if (pred) {
      const xpInfo = getBetXpInfo(match, pred);
      xpText = xpInfo.pending ? T("betXpPending") : `+${xpInfo.xp} XP`;
      xpClass = xpInfo.pending ? "bet-xp-pending" : xpInfo.xp > 0 ? "bet-xp-earned" : "bet-xp-zero";
    } else {
      xpText = T("myBetsNoPred");
      xpClass = "bet-xp-pending";
    }

    const betGoalsHtml = buildGoalsHtml(g);
    card.innerHTML = `
      <div class="my-bet-header">
        <span class="my-bet-teams"><span class="team-flag">${teamFlag(mHome(match))}</span> ${mHome(match)} ${T("vs")} <span class="team-flag">${teamFlag(mAway(match))}</span> ${mAway(match)}</span>
        <span class="bet-status-pill ${statusClass}">${statusLabel}</span>
      </div>
      <p class="my-bet-date">${match.date}</p>
      <div class="my-bet-score">${scoreText}</div>
      ${betGoalsHtml ? `<div class="my-bet-goals">${betGoalsHtml}</div>` : ""}
      <div class="my-bet-xp ${xpClass}">${xpText}</div>
    `;

    card.addEventListener("click", () => openBetDetail(match, pred));
    myBetsList.appendChild(card);
  }
}

function openBetDetail(match, pred) {
  const g = getMatchGameData(match);
  const status = getBetMatchStatus(match);

  const scoreText = g
    ? `${g.homeScore ?? "—"} : ${g.awayScore ?? "—"}`
    : "— : —";

  const statusLabel =
    status === "final" ? T("betStatusFinal")
      : status === "live" ? T("betStatusLive")
        : T("betStatusUpcoming");

  let xpText, xpClass, partsHtml, predSection;
  if (pred) {
    const xpInfo = getBetXpInfo(match, pred);
    xpText = xpInfo.pending ? T("betXpPending") : `+${xpInfo.xp} XP`;
    xpClass = xpInfo.pending ? "bet-xp-pending" : xpInfo.xp > 0 ? "bet-xp-earned" : "bet-xp-zero";
    partsHtml = xpInfo.parts.length ? `<p class="bet-detail-parts">${xpInfo.parts.join(" • ")}</p>` : "";
    predSection = `
      <div class="bet-detail-section">
        <h4>${T("betYourPred")}</h4>
        <div class="bet-detail-grid">
          <span class="bet-detail-label">${T("betOutcome")}</span>
          <span class="bet-detail-value">${formatPredOutcome(pred, match)}</span>
          <span class="bet-detail-label">${T("betScore")}</span>
          <span class="bet-detail-value">${pred.scoreHome ?? 0} : ${pred.scoreAway ?? 0}</span>
          <span class="bet-detail-label">${T("betTotal")}</span>
          <span class="bet-detail-value">${formatPredTotal(pred)}</span>
          <span class="bet-detail-label">${T("betFirst")}</span>
          <span class="bet-detail-value">${formatPredFirst(pred, match)}</span>
          <span class="bet-detail-label">${T("betConfidence")}</span>
          <span class="bet-detail-value">${formatPredConfidence(pred, match)}</span>
        </div>
      </div>`;
  } else {
    xpText = T("myBetsNoPred");
    xpClass = "bet-xp-pending";
    partsHtml = "";
    predSection = `<p class="bet-detail-no-pred">${T("myBetsNoPred")}</p>`;
  }

  const overlay = document.createElement("div");
  overlay.className = "bet-detail-overlay";
  overlay.innerHTML = `
    <div class="bet-detail-card panel">
      <button type="button" class="bet-detail-close icon-btn">×</button>
      <h3 class="bet-detail-title"><span class="team-flag">${teamFlag(mHome(match))}</span> ${mHome(match)} ${T("vs")} <span class="team-flag">${teamFlag(mAway(match))}</span> ${mAway(match)}</h3>
      <p class="bet-detail-date">${match.date} — ${statusLabel}</p>
      <div class="bet-detail-score">${scoreText}</div>
      ${g?.events?.length ? `<div class="bet-detail-goals">${buildGoalsHtml(g)}</div>` : ""}
      ${predSection}
      <div class="bet-detail-xp ${xpClass}">${xpText}</div>
      ${partsHtml}
    </div>
  `;
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest(".bet-detail-close")) overlay.remove();
  });
  document.body.appendChild(overlay);
}

function showMyBetsView() {
  matchesView.classList.remove("active");
  predictionView.classList.remove("active");
  if (leaderboardView) leaderboardView.classList.remove("active");
  if (profileView) profileView.classList.remove("active");
  if (myBetsView) myBetsView.classList.add("active");
  document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
  document.querySelector('[data-nav="matches"]')?.classList.add("active");
  renderMyBets();
}

const FAKE_LEADERBOARD = [
  { addr: "0x7a3F...9c21", xp: 0 },
  { addr: "0xdE44...1bA7", xp: 0 },
  { addr: "0x91Bc...e3F0", xp: 0 },
  { addr: "0x2fAa...7d55", xp: 0 },
  { addr: "0xC8e1...42aD", xp: 0 },
  { addr: "0x5B09...fE88", xp: 0 },
  { addr: "0xaA72...0c4B", xp: 0 },
  { addr: "0x3Dd6...8E19", xp: 0 },
  { addr: "0xF1b3...5a0C", xp: 0 },
  { addr: "0x68eC...dD37", xp: 0 },
  { addr: "0xBb05...1fA9", xp: 0 },
  { addr: "0x4c7E...6B20", xp: 0 },
  { addr: "0xe9A1...c8D4", xp: 0 },
  { addr: "0x0Fb8...3e67", xp: 0 },
  { addr: "0x82dC...aF05", xp: 0 },
  { addr: "0xD63a...74B8", xp: 0 },
  { addr: "0x1Ae5...9c3F", xp: 0 },
  { addr: "0x7bC0...2D86", xp: 0 },
  { addr: "0xFf94...e1Ab", xp: 0 }
];

function getPlayerAddress() {
  const W = window.PLWallet;
  if (W?.getState) {
    const s = W.getState();
    if (s.isConnected && s.address) {
      return s.address;
    }
  }
  return null;
}

function shortAddr(addr) {
  if (!addr || addr.length < 10) return addr || "???";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function lbAvatarColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  const hue = ((h % 360) + 360) % 360;
  return `hsl(${hue}, 50%, 38%)`;
}

function renderLeaderboard() {
  if (!leaderboardBody) return;
  leaderboardBody.innerHTML = "";

  const profile = loadProfile();
  const myXp = Number(profile.xp) || 0;
  const myAddr = getPlayerAddress();
  const myLabel = myAddr ? shortAddr(myAddr) : (profile.nickname || T("lbYou"));

  const rows = FAKE_LEADERBOARD.map((e) => ({ label: e.addr, xp: e.xp, isMe: false }));
  rows.push({ label: myLabel, xp: myXp, isMe: true });
  rows.sort((a, b) => b.xp - a.xp);

  const loc = typeof plGetLocale === "function" ? plGetLocale() : "en";
  const fmt = (n) => n.toLocaleString(loc === "ru" ? "ru-RU" : "en-US");

  rows.forEach((row, i) => {
    const rank = i + 1;
    const el = document.createElement("div");
    el.className = "lb-row" + (row.isMe ? " lb-row-me" : "");

    const medal =
      rank === 1 ? '<span class="lb-medal">🥇</span>'
        : rank === 2 ? '<span class="lb-medal">🥈</span>'
          : rank === 3 ? '<span class="lb-medal">🥉</span>'
            : "";

    const avatarLetter = row.label.charAt(row.label.startsWith("0x") ? 2 : 0).toUpperCase();
    const avatarBg = row.isMe
      ? "linear-gradient(135deg,var(--accent),var(--accent-2))"
      : `linear-gradient(135deg,${lbAvatarColor(row.label)},${lbAvatarColor(row.label + "z")})`;
    el.innerHTML = `
      <span class="lb-col-rank">${medal || rank}</span>
      <span class="lb-col-player"><span class="lb-avatar" style="background:${avatarBg}">${avatarLetter}</span><span class="lb-player-name">${row.label}${row.isMe ? ` <span class="lb-you-badge">${T("lbYou")}</span>` : ""}</span></span>
      <span class="lb-col-xp">${fmt(row.xp)}</span>
    `;
    leaderboardBody.appendChild(el);
  });
}

function showLeaderboardView() {
  matchesView.classList.remove("active");
  predictionView.classList.remove("active");
  if (myBetsView) myBetsView.classList.remove("active");
  if (profileView) profileView.classList.remove("active");
  if (leaderboardView) leaderboardView.classList.add("active");
  document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
  document.querySelector('[data-nav="leaderboard"]')?.classList.add("active");
  renderLeaderboard();
}

function getMyRank() {
  const profile = loadProfile();
  const myXp = Number(profile.xp) || 0;
  const rows = FAKE_LEADERBOARD.map((e) => e.xp);
  rows.push(myXp);
  rows.sort((a, b) => b - a);
  return rows.indexOf(myXp) + 1;
}

function getMyBetsCount() {
  const preds = loadPredictions();
  return Object.keys(preds).length;
}

function renderProfile() {
  if (!profileContent) return;
  const profile = loadProfile();
  const xp = Number(profile.xp) || 0;
  const level = Math.floor(xp / 2000) + 1;
  const inLevel = xp % 2000;
  const pct = Math.round((inLevel / 2000) * 100);
  const rank = getMyRank();
  const betsCount = getMyBetsCount();
  const loc = typeof plGetLocale === "function" ? plGetLocale() : "en";
  const fmtXp = xp.toLocaleString(loc === "ru" ? "ru-RU" : "en-US");

  const myAddr = getPlayerAddress();
  const walletLine = myAddr ? shortAddr(myAddr) : T("profileNotConnected");
  const name = profile.nickname || (myAddr ? shortAddr(myAddr) : T("guest"));

  profileContent.innerHTML = `
    <div class="profile-card panel">
      <div class="profile-avatar">${name.slice(0, 2).toUpperCase()}</div>
      <h2 class="profile-name">${name}</h2>
      <p class="profile-wallet-line">${T("profileWallet")}: ${walletLine}</p>
      <button type="button" class="profile-edit-btn" id="profileEditNameBtn">${T("profileEditName")}</button>
    </div>

    <div class="profile-stats-grid">
      <div class="profile-stat panel">
        <span class="profile-stat-value">${fmtXp}</span>
        <span class="profile-stat-label">${T("profileXpTotal")}</span>
      </div>
      <div class="profile-stat panel">
        <span class="profile-stat-value">#${rank}</span>
        <span class="profile-stat-label">${T("profileRank")}</span>
      </div>
      <div class="profile-stat panel">
        <span class="profile-stat-value">${betsCount}</span>
        <span class="profile-stat-label">${T("profileTotalBets")}</span>
      </div>
      <div class="profile-stat panel">
        <span class="profile-stat-value">${level}</span>
        <span class="profile-stat-label">${T("profileLevel")}</span>
      </div>
    </div>

    <div class="profile-xp-section panel">
      <div class="profile-xp-header">
        <span>${T("profileLevel")} ${level}</span>
        <span>${inLevel} / 2000</span>
      </div>
      <div class="progress-track">
        <span class="progress-fill" style="width: ${pct}%"></span>
      </div>
    </div>

    <div class="profile-info panel">
      <div class="profile-info-row">
        <span>${T("profileSeason")}</span>
        <span>${T("profileJoinedNow")}</span>
      </div>
    </div>
  `;

  document.getElementById("profileEditNameBtn")?.addEventListener("click", () => {
    const current = loadProfile();
    const newName = window.prompt(T("promptName"), current.nickname || "");
    if (newName === null) return;
    current.nickname = newName.trim() || current.nickname;
    saveProfile(current);
    renderProfile();
    updateHeroXp();
    showToast(current.nickname ? T("profileHi", { name: current.nickname }) : T("profileUpdated"));
  });
}

function showProfileView() {
  matchesView.classList.remove("active");
  predictionView.classList.remove("active");
  if (myBetsView) myBetsView.classList.remove("active");
  if (leaderboardView) leaderboardView.classList.remove("active");
  if (profileView) profileView.classList.add("active");
  document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
  document.querySelector('[data-nav="profile"]')?.classList.add("active");
  renderProfile();
}

function renderMatches() {
  matchesList.innerHTML = "";
  const activeMatches = matches.filter(m => !m.archived).sort((a, b) => (a.kickoffMs || 0) - (b.kickoffMs || 0));
  activeMatches.forEach((match) => {
    const isLiveApi = match.liveApi === true;
    const card = document.createElement("article");
    card.className = "match-card panel";
    card.dataset.matchCard = String(match.id);
    card.dataset.matchType = match.type || "";
    const whenLeague = match.league ? `${match.date} · ${match.league}` : match.date;
    const statusRow = isLiveApi
      ? `<div class="match-status-row is-waiting" data-live-row="${match.id}">
          <span class="status-pill status-pill-upcoming" data-status-pill="${match.id}">${T("statusUpcoming")}</span>
          <span class="match-card-score" data-live-score>— : —</span>
          <span class="sport-pill">${T("cardFootball")}</span>
        </div>`
      : `<div class="match-status-row match-status-row--static">
          <span class="status-pill status-pill-upcoming">${T("statusUpcoming")}</span>
          <span class="match-card-score match-card-score--muted">— : —</span>
          <span class="sport-pill">${T("cardFootball")}</span>
        </div>`;
    const ctx =
      match.kickoffMs && match.kickoffMs > Date.now() ? formatStartsIn(match.kickoffMs) : "";
    const ctxHidden = !ctx;

    const savedPred = loadSavedPrediction(match);
    const savedBadge = savedPred
      ? `<span class="pred-saved-badge">${T("predSavedBadge")}</span>`
      : "";
    const hf = teamFlag(mHome(match));
    const af = teamFlag(mAway(match));
    card.innerHTML = `
      <p class="match-card-teams">${hf ? `<span class="team-flag">${hf}</span> ` : ""}${mHome(match)} ${T("vs")} ${af ? `<span class="team-flag">${af}</span> ` : ""}${mAway(match)}</p>
      <p class="match-card-when">${whenLeague}</p>
      ${statusRow}
      <div class="match-card-goals" data-match-goals="${match.id}"></div>
      <p class="match-card-context" data-match-context="${match.id}"${ctxHidden ? " hidden" : ""}>${ctx}</p>
      <div class="match-card-actions">
        <span class="match-meta-compact">${T("cardMarketsLine")}${savedBadge}</span>
        <button class="predict-btn" type="button" data-match-id="${match.id}">${T("cardPredict")}</button>
      </div>
    `;
    matchesList.appendChild(card);
  });
  refreshLiveCardsFromState();
  matches.forEach((m) => {
    const g = m.liveApi ? state.liveSnapshotsByMatchId[m.id] : undefined;
    updateMatchCardContext(m, g);
    if (m.liveApi && g && !g.noData) {
      updateMatchCardVisualState(m.id, g, m);
    }
  });
  startMatchesCountdown();
}

function buildSegmentButtons(container, options, groupName) {
  container.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "segment-btn";
    button.dataset.group = groupName;
    button.dataset.value = option.value;
    button.textContent = option.label;
    container.appendChild(button);
  });
}

function buildConfidenceOptions(match) {
  confidenceOptions.innerHTML = "";
  const unset = T("confScorersUnset");
  const options = [
    {
      value: "outcome",
      label: T("confOutcome", { home: mHome(match), drawLabel: T("draw"), away: mAway(match) }),
      enabled: Boolean(state.outcome)
    },
    { value: "score", label: T("confScore", { h: state.score.home, a: state.score.away }), enabled: true },
    {
      value: "total",
      label: T("confTotal", { v: state.totalGoals ? state.totalGoals.replace("_", " ") : unset }),
      enabled: Boolean(state.totalGoals)
    },
    {
      value: "first",
      label: T("confFirst", { v: state.firstToScore ? state.firstToScore : unset }),
      enabled: Boolean(state.firstToScore)
    }
  ];
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "confidence-btn";
    button.dataset.confidence = option.value;
    button.textContent = option.label;
    if (!option.enabled) button.classList.add("locked");
    if (state.confidence === option.value && option.enabled) button.classList.add("selected");
    confidenceOptions.appendChild(button);
  });
}

function resetPredictionState() {
  state.outcome = "";
  state.score = { home: 1, away: 1 };
  state.totalGoals = "";
  state.firstToScore = "";
  state.confidence = "";
  state.countdownSeconds = 0;
}

function parseDeadlineToSeconds(deadline) {
  const matched = deadline.match(/(\d+)h\s*(\d+)m/i);
  if (!matched) return 3 * 3600 + 14 * 60 + 21;
  const hours = Number(matched[1] || 0);
  const minutes = Number(matched[2] || 0);
  return hours * 3600 + minutes * 60 + 21;
}

function formatCountdown(seconds) {
  const safe = Math.max(0, seconds);
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function setCountdownMood() {
  countdownPill.classList.remove("warning", "critical", "pulse");
  if (state.countdownSeconds < 3600) {
    countdownPill.classList.add("critical", "pulse");
    return;
  }
  if (state.countdownSeconds < 3 * 3600) {
    countdownPill.classList.add("warning");
  }
}

function updateCountdownText() {
  countdownText.textContent = formatCountdown(state.countdownSeconds);
  setCountdownMood();
}

function startCountdown() {
  if (countdownIntervalId) clearInterval(countdownIntervalId);
  updateCountdownText();
  countdownIntervalId = setInterval(() => {
    if (state.countdownSeconds <= 0) {
      updateCountdownText();
      clearInterval(countdownIntervalId);
      countdownIntervalId = null;
      return;
    }
    state.countdownSeconds -= 1;
    updateCountdownText();
  }, 1000);
}

function startMatchesCountdown() {
  if (matchesCountdownIntervalId) clearInterval(matchesCountdownIntervalId);
  if (!matches.length) return;
  const tick = () => {
    matches.forEach((m) => {
      const g = m.liveApi ? state.liveSnapshotsByMatchId[m.id] : undefined;
      updateMatchCardContext(m, g);
    });
  };
  tick();
  matchesCountdownIntervalId = setInterval(tick, 30000);
}

function openPrediction(matchId) {
  const match = matches.find((item) => item.id === Number(matchId));
  if (!match) return;

  state.selectedMatch = match;
  resetPredictionState();

  const saved = loadSavedPrediction(match);
  const hasSaved = Boolean(saved);
  if (hasSaved) restorePredictionToState(saved);

  const started = isMatchStarted(match);
  const final = isMatchFinal(match);
  const locked = started;

  matchHeaderTitle.innerHTML = `<span class="team-flag">${teamFlag(mHome(match))}</span> ${mHome(match)} ${T("vs")} <span class="team-flag">${teamFlag(mAway(match))}</span> ${mAway(match)}`;
  matchHeaderDate.textContent = match.league
    ? T("footballLeagueLine", { date: match.date, league: match.league })
    : T("footballDateOnly", { date: match.date });
  const hPredFlag = teamFlag(mHome(match));
  const aPredFlag = teamFlag(mAway(match));
  homeBadge.textContent = hPredFlag || initials(mHome(match));
  homeBadge.classList.toggle("team-badge-flag", Boolean(hPredFlag));
  awayBadge.textContent = aPredFlag || initials(mAway(match));
  awayBadge.classList.toggle("team-badge-flag", Boolean(aPredFlag));
  homeName.textContent = mHome(match);
  awayName.textContent = mAway(match);
  homeScoreLabel.textContent = mHome(match);
  awayScoreLabel.textContent = mAway(match);
  state.countdownSeconds = match.kickoffMs
    ? Math.max(0, Math.floor((match.kickoffMs - Date.now()) / 1000))
    : parseDeadlineToSeconds(match.deadline);

  buildSegmentButtons(
    outcomeOptions,
    [
      { value: "home", label: T("winHome", { team: mHome(match) }) },
      { value: "draw", label: T("draw") },
      { value: "away", label: T("winAway", { team: mAway(match) }) }
    ],
    "outcome"
  );
  buildSegmentButtons(
    totalGoalsOptions,
    [
      { value: "over_2_5", label: T("over25") },
      { value: "under_2_5", label: T("under25") }
    ],
    "total"
  );
  buildSegmentButtons(
    firstToScoreOptions,
    [
      { value: "home", label: `${mHome(match)}` },
      { value: "away", label: `${mAway(match)}` },
      { value: "none", label: T("noGoals") }
    ],
    "first"
  );

  if (hasSaved) applySelectedButtons();

  buildConfidenceOptions(match);
  renderScore();
  refreshSelectionUI();

  if (locked) {
    setFormLocked(true);
    submitBtn.disabled = true;
    submitBtn.textContent = final ? T("predLockedFinal") : T("predLocked");
    if (countdownPill) {
      countdownPill.classList.add("is-hidden");
    }
  } else {
    setFormLocked(false);
    submitBtn.textContent = hasSaved ? T("submitUpdate") : T("submit");
    if (countdownPill) {
      countdownPill.classList.remove("is-hidden");
    }
    startCountdown();
  }

  state.liveSnapshot = state.liveSnapshotsByMatchId[match.id] || null;
  if (match.liveApi && state.liveSnapshot && !state.liveSnapshot.noData) {
    updatePredictionLiveBanner(state.liveSnapshot, match);
  } else if (liveScoreBanner) {
    liveScoreBanner.classList.add("is-hidden");
    const pg = document.getElementById("predGoalsList");
    if (pg) { pg.innerHTML = ""; pg.classList.add("is-hidden"); }
  }

  matchesView.classList.remove("active");
  predictionView.classList.add("active");
  document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
  document.querySelector('[data-nav="matches"]').classList.add("active");
}

function goToHome() {
  predictionView.classList.remove("active");
  if (myBetsView) myBetsView.classList.remove("active");
  if (leaderboardView) leaderboardView.classList.remove("active");
  if (profileView) profileView.classList.remove("active");
  matchesView.classList.add("active");
  document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
  document.querySelector('[data-nav="home"]').classList.add("active");
  if (countdownIntervalId) {
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
  }
}

function renderScore() {
  const homeBefore = homeScoreValue.textContent;
  const awayBefore = awayScoreValue.textContent;
  homeScoreValue.textContent = String(state.score.home);
  awayScoreValue.textContent = String(state.score.away);
  if (homeBefore !== homeScoreValue.textContent) {
    homeScoreValue.classList.remove("bump");
    void homeScoreValue.offsetWidth;
    homeScoreValue.classList.add("bump");
  }
  if (awayBefore !== awayScoreValue.textContent) {
    awayScoreValue.classList.remove("bump");
    void awayScoreValue.offsetWidth;
    awayScoreValue.classList.add("bump");
  }
}

function updateScore(team, delta) {
  const key = team === "home" ? "home" : "away";
  const next = Math.max(0, Math.min(9, state.score[key] + delta));
  state.score[key] = next;
  renderScore();
  refreshSelectionUI();
}

function setSingleChoice(group, value, container) {
  container.querySelectorAll(".segment-btn").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.value === value);
  });
  if (group === "outcome") state.outcome = value;
  if (group === "total") state.totalGoals = value;
  if (group === "first") state.firstToScore = value;
  refreshSelectionUI();
}

function setConfidence(value) {
  const selectedButton = confidenceOptions.querySelector(`[data-confidence="${value}"]`);
  if (!(selectedButton instanceof HTMLButtonElement) || selectedButton.classList.contains("locked")) return;
  state.confidence = value;
  confidenceOptions.querySelectorAll(".confidence-btn").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.confidence === value);
  });
  refreshSelectionUI();
}

function selectedCount() {
  const scoreSelected = true;
  return [
    Boolean(state.outcome),
    scoreSelected,
    Boolean(state.totalGoals),
    Boolean(state.firstToScore)
  ].filter(Boolean).length;
}

function refreshSelectionUI() {
  const count = selectedCount();
  const percent = Math.round((count / MARKET_COUNT) * 100);
  const confidenceAvailable = new Set(["outcome", "score", "total", "first"].filter((key) => {
    if (key === "outcome") return Boolean(state.outcome);
    if (key === "score") return true;
    if (key === "total") return Boolean(state.totalGoals);
    return Boolean(state.firstToScore);
  }));
  if (state.confidence && !confidenceAvailable.has(state.confidence)) state.confidence = "";

  selectedSummary.textContent = T("selectedSummary", { n: count });
  actionSelected.textContent = T("actionSelected", { n: count });
  actionConfidence.textContent = state.confidence ? T("actionConfidenceYes") : T("actionConfidenceNo");
  progressBar.style.width = `${percent}%`;
  progressPanel.classList.toggle("complete", count === MARKET_COUNT);
  submitBtn.disabled = count < MARKET_COUNT;
  if (state.selectedMatch) buildConfidenceOptions(state.selectedMatch);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function applyLocaleToPredictionForm() {
  const match = state.selectedMatch;
  if (!match || !predictionView?.classList.contains("active")) return;

  matchHeaderTitle.innerHTML = `<span class="team-flag">${teamFlag(mHome(match))}</span> ${mHome(match)} ${T("vs")} <span class="team-flag">${teamFlag(mAway(match))}</span> ${mAway(match)}`;
  matchHeaderDate.textContent = match.league
    ? T("footballLeagueLine", { date: match.date, league: match.league })
    : T("footballDateOnly", { date: match.date });

  buildSegmentButtons(
    outcomeOptions,
    [
      { value: "home", label: T("winHome", { team: mHome(match) }) },
      { value: "draw", label: T("draw") },
      { value: "away", label: T("winAway", { team: mAway(match) }) }
    ],
    "outcome"
  );
  if (state.outcome) {
    outcomeOptions.querySelectorAll(".segment-btn").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.value === state.outcome);
    });
  }

  buildSegmentButtons(
    totalGoalsOptions,
    [
      { value: "over_2_5", label: T("over25") },
      { value: "under_2_5", label: T("under25") }
    ],
    "total"
  );
  if (state.totalGoals) {
    totalGoalsOptions.querySelectorAll(".segment-btn").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.value === state.totalGoals);
    });
  }

  buildSegmentButtons(
    firstToScoreOptions,
    [
      { value: "home", label: `${mHome(match)}` },
      { value: "away", label: `${mAway(match)}` },
      { value: "none", label: T("noGoals") }
    ],
    "first"
  );
  if (state.firstToScore) {
    firstToScoreOptions.querySelectorAll(".segment-btn").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.value === state.firstToScore);
    });
  }

  buildConfidenceOptions(match);
  if (state.confidence) {
    confidenceOptions.querySelectorAll(".confidence-btn").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.confidence === state.confidence);
    });
  }

  if (match.liveApi && state.liveSnapshot && !state.liveSnapshot.noData) {
    updatePredictionLiveBanner(state.liveSnapshot, match);
  }
}

window.addEventListener("pl-locale-change", () => {
  updateHeroXp();
  renderMatches();
  if (myBetsView?.classList.contains("active")) renderMyBets();
  applyLocaleToPredictionForm();
  refreshSelectionUI();
  if (typeof refreshWalletPanelUi === "function") refreshWalletPanelUi();
});

matchesList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest("[data-match-id]");
  if (!(button instanceof HTMLElement)) return;
  openPrediction(button.dataset.matchId);
});

backBtn.addEventListener("click", goToHome);

document.querySelectorAll(".bottom-nav .nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    const nav = button.dataset.nav;
    if (nav === "home") {
      goToHome();
      return;
    }
    if (nav === "matches") {
      predictionView.classList.remove("active");
      matchesView.classList.remove("active");
      if (myBetsView) myBetsView.classList.remove("active");
      if (leaderboardView) leaderboardView.classList.remove("active");
      showMyBetsView();
      return;
    }
    if (nav === "leaderboard") {
      predictionView.classList.remove("active");
      matchesView.classList.remove("active");
      if (myBetsView) myBetsView.classList.remove("active");
      if (leaderboardView) leaderboardView.classList.remove("active");
      showLeaderboardView();
      return;
    }
    if (nav === "profile") {
      predictionView.classList.remove("active");
      matchesView.classList.remove("active");
      if (myBetsView) myBetsView.classList.remove("active");
      if (leaderboardView) leaderboardView.classList.remove("active");
      if (profileView) profileView.classList.remove("active");
      showProfileView();
      return;
    }
    const labelEl = button.querySelector("span");
    const name = (labelEl?.textContent || button.textContent || "").trim();
    showToast(T("demoPlaceholder", { name }));
  });
});

outcomeOptions.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.dataset.value) return;
  setSingleChoice("outcome", target.dataset.value, outcomeOptions);
});

totalGoalsOptions.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.dataset.value) return;
  setSingleChoice("total", target.dataset.value, totalGoalsOptions);
});

firstToScoreOptions.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.dataset.value) return;
  setSingleChoice("first", target.dataset.value, firstToScoreOptions);
});

confidenceOptions.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.dataset.confidence) return;
  setConfidence(target.dataset.confidence);
});

document.querySelectorAll(".step-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const team = button.dataset.stepTeam;
    const direction = Number(button.dataset.stepDir || 0);
    if (!team || !direction) return;
    updateScore(team, direction);
  });
});

submitBtn.addEventListener("click", () => {
  if (submitBtn.disabled || !state.selectedMatch) return;
  const match = state.selectedMatch;
  if (isMatchStarted(match)) return;

  submitBtn.classList.remove("burst");
  void submitBtn.offsetWidth;
  submitBtn.classList.add("burst");
  const key = predictionStorageKey(match);
  const preds = loadPredictions();
  preds[key] = {
    outcome: state.outcome,
    scoreHome: state.score.home,
    scoreAway: state.score.away,
    scorers: [],
    totalGoals: state.totalGoals,
    firstToScore: state.firstToScore,
    confidence: state.confidence,
    submittedAt: Date.now()
  };
  savePredictions(preds);
  submitBtn.textContent = T("submitUpdate");
  const summary = `${mHome(match)} ${state.score.home}:${state.score.away} ${mAway(match)}`;
  showToast(
    match.liveApi ? T("predSavedLive", { summary }) : T("predSaved", { summary })
  );
});

const heroRewardsBtn = document.getElementById("heroRewardsBtn");
if (heroRewardsBtn) {
  heroRewardsBtn.addEventListener("click", () => {
    showToast(T("demoPlaceholder", { name: T("statRewards") }));
  });
}

/* ─── Notifications ─── */
const STORAGE_NOTIFS = "pl_notifications_v1";

function loadNotifications() {
  try { return JSON.parse(localStorage.getItem(STORAGE_NOTIFS) || "[]"); }
  catch { return []; }
}
function saveNotifications(list) {
  localStorage.setItem(STORAGE_NOTIFS, JSON.stringify(list.slice(-30)));
}
function addNotification(text, matchId) {
  const list = loadNotifications();
  if (list.some(n => n.matchId === matchId && n.type === "start")) return;
  list.push({ text, matchId, type: "start", time: Date.now(), read: false });
  saveNotifications(list);
  updateNotifBadge();
}
function updateNotifBadge() {
  const unread = loadNotifications().filter(n => !n.read).length;
  if (notifBadge) {
    notifBadge.textContent = unread > 9 ? "9+" : String(unread);
    notifBadge.classList.toggle("is-hidden", unread === 0);
  }
}
function markAllNotifsRead() {
  const list = loadNotifications();
  list.forEach(n => { n.read = true; });
  saveNotifications(list);
  updateNotifBadge();
}

function checkMatchStartNotifications(game, match) {
  if (!game || game.noData) return;
  const wasStarted = state._notifiedStarted || new Set();
  state._notifiedStarted = wasStarted;
  if (wasStarted.has(match.id)) return;
  if (isFootballLiveStatus(game.statusShort || game.status)) {
    wasStarted.add(match.id);
    const text = `${mHome(match)} ${T("vs")} ${mAway(match)} — ${T("notifMatchStarted")}`;
    addNotification(text, match.id);
  }
}

function renderNotifDropdown() {
  let overlay = document.getElementById("notifOverlay");
  if (overlay) { overlay.remove(); return; }

  const list = loadNotifications().slice().reverse();
  overlay = document.createElement("div");
  overlay.id = "notifOverlay";
  overlay.className = "notif-overlay";

  const empty = !list.length;
  overlay.innerHTML = `
    <div class="notif-dropdown panel">
      <div class="notif-dropdown-header">
        <span class="notif-dropdown-title">${T("notifications")}</span>
        <button type="button" class="notif-dropdown-close icon-btn">×</button>
      </div>
      <div class="notif-dropdown-body">
        ${empty ? `<p class="notif-empty">${T("notifEmpty")}</p>` :
          list.map(n => `<div class="notif-item${n.read ? "" : " notif-unread"}">
            <span class="notif-dot">${n.read ? "" : "●"}</span>
            <span class="notif-text">${n.text}</span>
            <span class="notif-time">${formatNotifTime(n.time)}</span>
          </div>`).join("")}
      </div>
    </div>
  `;

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest(".notif-dropdown-close")) {
      overlay.remove();
    }
  });
  document.body.appendChild(overlay);
  markAllNotifsRead();
}

function formatNotifTime(ts) {
  const d = new Date(ts);
  const pad = n => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

if (notifHeaderBtn) {
  notifHeaderBtn.addEventListener("click", renderNotifDropdown);
}
updateNotifBadge();

const walletHeaderBtn = document.getElementById("walletHeaderBtn");
const walletHeaderLabel = document.getElementById("walletHeaderLabel");
const walletSheet = document.getElementById("walletSheet");
const walletSheetBackdrop = document.getElementById("walletSheetBackdrop");
const walletSheetClose = document.getElementById("walletSheetClose");
const walletConnectBtn = document.getElementById("walletConnectBtn");
const walletContinueGuestBtn = document.getElementById("walletContinueGuestBtn");
const walletCopyBtn = document.getElementById("walletCopyBtn");
const walletDisconnectBtn = document.getElementById("walletDisconnectBtn");
const walletSwitchBaseBtn = document.getElementById("walletSwitchBaseBtn");

function shortWalletAddress(addr) {
  if (!addr || typeof addr !== "string" || addr.length < 10) return addr || "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function openWalletSheet() {
  if (!walletSheet) return;
  walletSheet.classList.add("is-open");
  walletSheet.setAttribute("aria-hidden", "false");
  if (walletHeaderBtn) walletHeaderBtn.setAttribute("aria-expanded", "true");
  document.body.classList.add("wallet-sheet-open");
  refreshWalletPanelUi();
}

function closeWalletSheet() {
  if (!walletSheet) return;
  walletSheet.classList.remove("is-open");
  walletSheet.setAttribute("aria-hidden", "true");
  if (walletHeaderBtn) walletHeaderBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("wallet-sheet-open");
}

function refreshWalletHeaderUi() {
  const W = window.PLWallet;
  if (!walletHeaderBtn || !walletHeaderLabel) return;
  if (!W?.getState) {
    walletHeaderBtn.classList.remove("wallet-header-btn--connected");
    walletHeaderLabel.setAttribute("data-i18n", "walletShortLabel");
    walletHeaderLabel.textContent = T("walletShortLabel");
    return;
  }
  const s = W.getState();
  walletHeaderBtn.classList.toggle("wallet-header-btn--connected", Boolean(s.isConnected));
  if (s.isConnected && s.address) {
    walletHeaderLabel.removeAttribute("data-i18n");
    walletHeaderLabel.textContent = shortWalletAddress(s.address);
  } else {
    walletHeaderLabel.setAttribute("data-i18n", "walletShortLabel");
    walletHeaderLabel.textContent = T("walletShortLabel");
  }
}

function refreshWalletPanelUi() {
  const W = window.PLWallet;
  const disc = document.getElementById("walletDisconnected");
  const conn = document.getElementById("walletConnected");
  if (!disc || !conn) return;

  if (!W?.getState) {
    conn.classList.add("is-hidden");
    disc.classList.remove("is-hidden");
    refreshWalletHeaderUi();
    return;
  }

  const s = W.getState();
  if (s.isConnected) {
    disc.classList.add("is-hidden");
    conn.classList.remove("is-hidden");
    const addrEl = document.getElementById("walletAddressDisplay");
    if (addrEl) addrEl.textContent = s.address || "";
    const netEl = document.getElementById("walletNetworkLine");
    if (netEl) {
      if (s.chainId === W.BASE_CHAIN_ID) netEl.textContent = T("walletBaseNetwork");
      else if (s.chainId === W.BASE_SEPOLIA_ID) netEl.textContent = T("walletBaseSepoliaNetwork");
      else if (s.chainId != null) netEl.textContent = T("walletChainId", { id: s.chainId });
      else netEl.textContent = "—";
    }
    const wrong = document.getElementById("walletWrongNetwork");
    if (wrong) wrong.classList.toggle("is-hidden", !s.isWrongNetwork);
  } else {
    conn.classList.add("is-hidden");
    disc.classList.remove("is-hidden");
  }
  refreshWalletHeaderUi();
}

function installWalletUi() {
  if (!walletHeaderBtn) return;
  walletHeaderBtn.classList.remove("is-hidden");

  walletHeaderBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (walletSheet?.classList.contains("is-open")) {
      closeWalletSheet();
    } else {
      openWalletSheet();
    }
  });
  walletSheetBackdrop?.addEventListener("click", closeWalletSheet);
  walletSheetClose?.addEventListener("click", closeWalletSheet);
  walletContinueGuestBtn?.addEventListener("click", closeWalletSheet);

  walletConnectBtn?.addEventListener("click", async () => {
    const W = window.PLWallet;
    if (!W?.connect) {
      showToast(T("walletConnectFail"));
      return;
    }
    try {
      await W.connect();
      refreshWalletPanelUi();
    } catch (err) {
      console.warn("[PL Wallet] connect() rejected or error", err);
      const rejected =
        err?.code === 4001 ||
        err?.name === "UserRejectedRequestError" ||
        err?.cause?.code === 4001 ||
        err?.cause?.name === "UserRejectedRequestError";
      showToast(rejected ? T("walletConnectRejected") : T("walletConnectFail"));
    }
  });

  walletDisconnectBtn?.addEventListener("click", async () => {
    const W = window.PLWallet;
    if (!W?.disconnect) return;
    try {
      await W.disconnect();
      refreshWalletPanelUi();
    } catch {
      /* ignore */
    }
  });

  walletSwitchBaseBtn?.addEventListener("click", async () => {
    const W = window.PLWallet;
    if (!W?.switchToBase) return;
    try {
      await W.switchToBase();
      refreshWalletPanelUi();
    } catch {
      showToast(T("walletSwitchFail"));
    }
  });

  walletCopyBtn?.addEventListener("click", async () => {
    const W = window.PLWallet;
    if (!W?.getState) return;
    const s = W.getState();
    if (!s.address) return;
    try {
      await navigator.clipboard.writeText(s.address);
      showToast(T("walletCopiedToast"));
    } catch {
      showToast(T("walletConnectFail"));
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && walletSheet?.classList.contains("is-open")) closeWalletSheet();
  });

  void (async () => {
    const W = window.PLWallet;
    if (!W?.init) {
      refreshWalletPanelUi();
      return;
    }
    try {
      await W.init();
      W.subscribe(() => refreshWalletPanelUi());
      refreshWalletPanelUi();
    } catch (e) {
      console.warn("[PL Wallet] init failed (button stays visible)", e);
      refreshWalletPanelUi();
    }
  })();
}

if (walletHeaderBtn) {
  installWalletUi();
}

async function fetchArchivedResults() {
  const archived = matches.filter(m => m.archived && m.liveApi);
  if (!archived.length) return;
  const results = loadMatchResults();
  const missing = archived.filter(m => {
    const key = predictionStorageKey(m);
    return !results[key];
  });
  if (!missing.length) return;

  try {
    const resp = await fetch("/api/football/tracked?live=0");
    const data = await resp.json();
    if (!data.ok || !Array.isArray(data.results)) return;
    for (const row of data.results) {
      const match = missing.find(m => m.id === row.trackId);
      if (!match || !row.found || !row.game) continue;
      saveMatchResult(match, row.game);
      state.liveSnapshotsByMatchId[match.id] = row.game;
    }
    if (myBetsView?.classList.contains("active")) renderMyBets();
  } catch (err) {
    console.warn("[PL] Failed to fetch archived results:", err?.message);
  }
}

updateHeroXp();
renderMatches();
startLivePolling();
fetchArchivedResults();
refreshSelectionUI();
