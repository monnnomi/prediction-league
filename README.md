# Prediction League

Mobile-first football prediction app with live scores, XP progression, and optional Base wallet integration. Built as a dark-themed, bilingual (EN/RU) startup-grade MVP.

## Features

- **Match predictions** — predict outcome, exact score, total goals, and first to score
- **Live scores** — real-time updates via API-Football v3 with goal scorers and minutes
- **XP & levels** — earn XP based on prediction accuracy, track progression
- **Match archive** — browse past matches with results, goals, and XP breakdown
- **Leaderboard** — compete with other participants
- **Notifications** — get notified when matches kick off
- **Bilingual UI** — English and Russian with instant toggle
- **Base wallet** — optional wallet connection (MetaMask, Rabby, etc.)
- **Dark premium design** — mobile-first, responsive

## Getting started

### Prerequisites

- Node.js 18+
- npm
- API-Football v3 key — [get one here](https://dashboard.api-football.com/) (free tier: ~100 requests/day)

### Install

```bash
npm install
```

### Configure

```bash
cp .env.example .env
```

Edit `.env` and set your API-Football key:

```
API_SPORTS_KEY=your_actual_key
```

### Run

```bash
npm start
```

Opens at [http://localhost:5500](http://localhost:5500). The wallet bundle is built automatically before the server starts.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `API_SPORTS_KEY` | Yes | API-Football v3 key for live match data |

The server also accepts `API_SPORTS_FOOTBALL_KEY` or `API_SPORTS_HOCKEY_KEY` as alternative variable names.

## Wallet bundle

The Base wallet integration is compiled from `web3/` source modules into `wallet.bundle.js` using esbuild. This happens automatically via `prestart`, but can be triggered manually:

```bash
npm run build:wallet
```

## Project structure

```
index.html              App shell
script.js               UI logic, polling, XP, predictions, navigation
styles.css              Dark premium theme (mobile-first)
i18n.js                 EN/RU translations
identity.js             User identity state
server.mjs              Node.js server — static files + API-Football proxy
tracked-matches.json    Match configuration for live API polling
wallet.bundle.js        Compiled wallet integration (built from web3/)
web3/                   Wallet source modules
  ├── wallet-entry.mjs    Bundle entry point (named exports)
  ├── wallet-runtime.mjs  Connect/disconnect/subscribe logic
  ├── wagmi-config.mjs    wagmi + Base chain config
  └── chains.mjs          Chain definitions
```

## Tech stack

- Vanilla HTML / CSS / JS — no frontend framework
- Node.js backend — API proxy with caching + static file server
- [API-Football v3](https://www.api-football.com/) — live match data
- [wagmi](https://wagmi.sh/) + [viem](https://viem.sh/) — Base wallet integration
- [esbuild](https://esbuild.github.io/) — wallet bundle compiler

## License

MIT
