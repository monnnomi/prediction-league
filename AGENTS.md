# AI Development Guidelines — Prediction League

Rules for AI-assisted development on this project.

## Critical constraints

- Do NOT rewrite or refactor entire files
- Do NOT break: match logic, XP calculation, live polling, wallet behavior, navigation, i18n
- Do NOT rename localStorage keys without migration
- Do NOT remove code that "looks unused" without verifying — the wallet bundle and identity system have cross-file dependencies
- Do NOT add frameworks or TypeScript — this is vanilla JS by design
- Do NOT commit `.env` or any file containing API keys

## Code conventions

- All user-facing text must go through `T()` (i18n function) with keys in both EN and RU
- Navigation: every `show*View()` function must remove `.active` from ALL other views
- Matches: active matches sorted by `kickoffMs` ascending; old matches get `archived: true`
- CSS: mobile-first, dark theme, use existing custom properties (`--accent`, `--space-*`, `--radius-*`)
- Changes should be incremental — small, testable, reversible

## File overview

| File | Purpose |
|------|---------|
| `script.js` | All frontend logic |
| `server.mjs` | Node.js server + API-Football proxy |
| `styles.css` | All styles |
| `index.html` | App shell |
| `i18n.js` | EN/RU translations |
| `identity.js` | User identity state |
| `tracked-matches.json` | Server-side match polling config |
| `wallet.bundle.js` | Generated — do not edit |
| `web3/` | Wallet source (wagmi + viem) |

## After making changes

1. Verify all four navigation tabs work (Home, Matches, Leaderboard, Profile)
2. Verify predictions can be saved
3. Verify the Matches archive shows past results
4. Verify wallet connect/disconnect still works
5. Check mobile layout
