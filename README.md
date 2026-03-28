# Prediction League

Mobile-first football prediction app with live scores, XP progression, and optional Base wallet integration.

## Features

- **Match predictions** — predict outcome, exact score, total goals, and first to score
- **Live scores** — real-time updates via API-Football v3 with goal scorers and minutes
- **XP & levels** — earn XP based on prediction accuracy, track progress
- **Match archive** — browse past matches with results, goals, and XP breakdown
- **Leaderboard** — compete with other participants
- **Notifications** — get notified when matches kick off
- **Bilingual UI** — English and Russian
- **Base wallet** — optional wallet connection (MetaMask, Rabby, etc.)
- **Dark premium design** — mobile-first, responsive

## Setup

### Prerequisites

- Node.js 18+
- npm
- API-Football v3 key ([get one here](https://dashboard.api-football.com/) — free tier: ~100 requests/day)

### Install

```bash
npm install
```

### Configure

Copy the example env file and add your API key:

```bash
cp .env.example .env
```

Edit `.env` and replace `your_key_here` with your API-Football key.

### Run

```bash
npm start
```

This builds the wallet bundle and starts the server at `http://localhost:5500`.

For development (same behavior):

```bash
npm run dev
```

### Wallet bundle

The wallet integration bundle is built automatically via `prestart`/`predev`. To rebuild manually:

```bash
npm run build:wallet
```

This compiles `web3/wallet-entry.mjs` into `wallet.bundle.js` using esbuild.

## Project structure

```
index.html              Main app shell
script.js               App logic, UI, polling, XP, navigation
styles.css              All styles (dark premium theme)
i18n.js                 EN/RU translations
identity.js             User identity state
server.mjs              Node.js server (static files + API proxy)
tracked-matches.json    Tracked match configuration for API polling
wallet.bundle.js        Built wallet integration bundle
web3/                   Wallet source modules (wagmi + viem)
```

## Tech stack

- Vanilla HTML/CSS/JS frontend
- Node.js backend (API proxy + static server)
- API-Football v3 for live match data
- wagmi + viem for Base wallet integration
- esbuild for wallet bundle
