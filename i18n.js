(function () {
  const STORAGE_KEY = "pl_locale";

  const STRINGS = {
    en: {
      docTitle: "Prediction League",
      brandSub: "Season 1",
      connect: "Connect",
      walletTitle: "Wallet",
      walletShortLabel: "Wallet",
      walletConnectAria: "Wallet and Base network",
      walletConnect: "Connect Wallet",
      walletConnectBrowser: "Browser Wallet",
      walletConnectWC: "WalletConnect",
      walletDisconnect: "Disconnect",
      walletConnected: "Connected",
      walletWrongNetwork: "Wrong network — switch to Base to use onchain features later.",
      walletSwitchToBase: "Switch to Base",
      walletCopyAddress: "Copy Address",
      walletBaseNetwork: "Base",
      walletBaseSepoliaNetwork: "Base Sepolia",
      walletChainId: "Chain {id}",
      walletContinueGuest: "Continue as Guest",
      walletOptionalHint: "Optional. Predictions and XP work without a wallet.",
      walletCopiedToast: "Address copied.",
      walletConnectFail: "Could not connect wallet.",
      walletConnectRejected: "Request cancelled in the wallet.",
      walletSwitchFail: "Could not switch network.",
      walletCloseSheet: "Close wallet panel",
      langHint: "Switch language",
      notifications: "Notifications",
      notifMatchStarted: "Match started!",
      notifEmpty: "No notifications yet",
      profileAria: "Profile",
      backAria: "Back",
      heroEyebrow: "Season 1 is live",
      heroTitle: "Prediction League",
      heroSub: "Predict matches. Earn XP. Climb the league.",
      heroLevel: "Level {n}",
      heroXpOnly: "{xp} XP",
      heroXpLine: "XP {xp} • {name}",
      heroXpSub: "{cur} / 2000 to next level",
      guest: "Guest",
      heroTournamentLabel: "Current tournament",
      heroTournamentName: "Global League",
      statMatches: "5 matches",
      statXpLive: "XP season live",
      statRewards: "Top rewards",
      seasonLabel: "Current tournament",
      seasonTitle: "Global League",
      seasonLive: "Season 1 is live now.",
      sectionMatches: "Matches",
      navHome: "Home",
      navMatches: "Matches",
      navLeaderboard: "Leaderboard",
      lbTitle: "Leaderboard",
      lbSeason: "Season 1",
      lbRank: "#",
      lbPlayer: "Player",
      lbXp: "XP",
      lbYou: "You",
      navProfile: "Profile",
      profileTitle: "Profile",
      profileWallet: "Wallet",
      profileNotConnected: "Not connected",
      profileTotalBets: "Predictions",
      profileRank: "Rank",
      profileXpTotal: "Total XP",
      profileLevel: "Level",
      profileSeason: "Season 1",
      profileJoined: "Joined",
      profileJoinedNow: "This season",
      profileEditName: "Edit name",
      football: "Football",
      footballLeagueLine: "Football • {date} • {league}",
      footballDateOnly: "Football • {date}",
      countdownPrefix: "Predictions close in",
      matchHeroPill1: "Tournament match",
      matchHeroPill2: "4 prediction markets",
      matchHeroPill3: "+XP available",
      progressLabel: "Prediction progress",
      potentialXp: "Potential XP",
      xpBig: "+120 XP",
      microProgress: "Progress",
      selectedSummary: "{n}/4 selected",
      formOutcome: "1. Match Outcome",
      formExact: "2. Exact Score",
      formTotal: "3. Total Goals",
      formFirst: "4. First Team To Score",
      formConfidence: "🔥 Confidence Pick",
      badgeRequired: "Required",
      badgeBoost: "Boost",
      confidenceHint: "Choose one prediction to boost if correct.",
      actionSelected: "Selected: {n}/4",
      actionConfidenceYes: "Confidence: active",
      actionConfidenceNo: "Confidence: not selected",
      submit: "Submit Prediction",
      submitUpdate: "Update Prediction",
      predLocked: "Predictions locked — match started",
      predLockedFinal: "Match ended",
      predSavedBadge: "Saved ✓",
      myBetsEmpty: "No predictions yet. Make a prediction on the home screen.",
      myBetsNoPred: "No prediction placed",
      myBetsTitle: "My Predictions",
      betStatusLive: "LIVE",
      betStatusUpcoming: "Upcoming",
      betStatusFinal: "Final",
      betYourPred: "Your prediction",
      betOutcome: "Outcome",
      betScore: "Score",
      betTotal: "Total goals",
      betFirst: "First to score",
      betConfidence: "Confidence",
      betXpEarned: "XP earned",
      betXpPending: "XP pending — match not finished",
      betXpNone: "+0 XP",
      betOutcomeHome: "Win {team}",
      betOutcomeDraw: "Draw",
      betOutcomeAway: "Win {team}",
      betTotalOver: "Over 2.5",
      betTotalUnder: "Under 2.5",
      betFirstHome: "{team}",
      betFirstAway: "{team}",
      betFirstNone: "No goals",
      demoPlaceholder: "{name} is a demo placeholder.",
      statusLive: "LIVE",
      statusUpcoming: "Soon",
      statusFinal: "Final",
      statusNoData: "No live data",
      statusNoDataPill: "NO DATA",
      statusRaw: "STATUS",
      cardFootball: "Football",
      cardFeatured: "🔥 Featured",
      cardMetaLive: "Live data • API-Football v3",
      cardMetaStatic: "Static • predictions saved locally",
      cardMarketsLine: "4 markets • +XP",
      cardPredict: "Predict",
      xpLiveBadge: "XP live",
      startsInSoon: "Starting soon",
      startsInDays: "Starts in {n}d",
      startsInOneDay: "Starts in 1d",
      startsInHours: "Starts in {n}h",
      startsInMins: "Starts in {n}m",
      winHome: "Win {team}",
      draw: "Draw",
      winAway: "Win {team}",
      over25: "Over 2.5",
      under25: "Under 2.5",
      noGoals: "No goals",
      confOutcome: "Outcome • {home} / {drawLabel} / {away}",
      confScore: "Exact score • {h}:{a}",
      confScorersUnset: "not set",
      confTotal: "Total goals • {v}",
      confFirst: "First to score • {v}",
      predSavedLive: "Prediction saved: {summary}. XP is awarded when the match ends.",
      predSaved: "Prediction saved: {summary}.",
      profileHi: "Hi, {name}",
      profileUpdated: "Profile updated.",
      promptName: "Display name",
      matchEndXp: "Match finished. +{xp} XP — {parts}",
      matchEndNoXp: "Match finished. No XP this time.",
      xpOutcome: "Outcome +{n}",
      xpExact: "Exact +{n}",
      xpTotal: "Total +{n}",
      xpFirst: "First +{n}",
      bannerLive: "Live",
      bannerFinal: "Final",
      vs: "vs"
    },
    ru: {
      docTitle: "Prediction League",
      brandSub: "Сезон 1",
      connect: "Войти",
      walletTitle: "Кошелёк",
      walletShortLabel: "Кошелёк",
      walletConnectAria: "Кошелёк и сеть Base",
      walletConnect: "Подключить кошелёк",
      walletConnectBrowser: "Кошелёк браузера",
      walletConnectWC: "WalletConnect",
      walletDisconnect: "Отключить",
      walletConnected: "Подключено",
      walletWrongNetwork: "Неверная сеть — переключитесь на Base для будущих onchain-функций.",
      walletSwitchToBase: "Переключить на Base",
      walletCopyAddress: "Копировать адрес",
      walletBaseNetwork: "Base",
      walletBaseSepoliaNetwork: "Base Sepolia",
      walletChainId: "Сеть {id}",
      walletContinueGuest: "Продолжить как гость",
      walletOptionalHint: "Необязательно. Прогнозы и XP работают без кошелька.",
      walletCopiedToast: "Адрес скопирован.",
      walletConnectFail: "Не удалось подключить кошелёк.",
      walletConnectRejected: "Запрос отменён в кошельке.",
      walletSwitchFail: "Не удалось сменить сеть.",
      walletCloseSheet: "Закрыть панель кошелька",
      langHint: "Сменить язык",
      notifications: "Уведомления",
      notifMatchStarted: "Матч начался!",
      notifEmpty: "Пока нет уведомлений",
      profileAria: "Профиль",
      backAria: "Назад",
      heroEyebrow: "Сезон 1 уже идёт",
      heroTitle: "Prediction League",
      heroSub: "Угадывай матчи. Зарабатывай XP. Поднимайся в таблице.",
      heroLevel: "Уровень {n}",
      heroXpOnly: "{xp} XP",
      heroXpLine: "XP {xp} • {name}",
      heroXpSub: "{cur} / 2000 до следующего уровня",
      guest: "Гость",
      heroTournamentLabel: "Текущий турнир",
      heroTournamentName: "Глобальная лига",
      statMatches: "5 матчей",
      statXpLive: "Сезон XP активен",
      statRewards: "Топ награды",
      seasonLabel: "Текущий турнир",
      seasonTitle: "Глобальная лига",
      seasonLive: "Сезон 1 уже идёт.",
      sectionMatches: "Матчи",
      navHome: "Главная",
      navMatches: "Матчи",
      navLeaderboard: "Таблица",
      lbTitle: "Таблица лидеров",
      lbSeason: "Сезон 1",
      lbRank: "#",
      lbPlayer: "Игрок",
      lbXp: "XP",
      lbYou: "Вы",
      navProfile: "Профиль",
      profileTitle: "Профиль",
      profileWallet: "Кошелёк",
      profileNotConnected: "Не подключён",
      profileTotalBets: "Прогнозы",
      profileRank: "Место",
      profileXpTotal: "Всего XP",
      profileLevel: "Уровень",
      profileSeason: "Сезон 1",
      profileJoined: "Вступил",
      profileJoinedNow: "Этот сезон",
      profileEditName: "Изменить имя",
      football: "Футбол",
      footballLeagueLine: "Футбол • {date} • {league}",
      footballDateOnly: "Футбол • {date}",
      countdownPrefix: "Прогнозы принимаются ещё",
      matchHeroPill1: "Матч турнира",
      matchHeroPill2: "4 рынка прогноза",
      matchHeroPill3: "+XP доступно",
      progressLabel: "Прогресс прогноза",
      potentialXp: "Потенциальный XP",
      xpBig: "+120 XP",
      microProgress: "Прогресс",
      selectedSummary: "Выбрано {n}/4",
      formOutcome: "1. Исход матча",
      formExact: "2. Точный счёт",
      formTotal: "3. Всего голов",
      formFirst: "4. Кто забьёт первым",
      formConfidence: "🔥 Уверенный выбор",
      badgeRequired: "Обязательно",
      badgeBoost: "Буст",
      confidenceHint: "Выберите один прогноз для удвоения XP, если он сыграет.",
      actionSelected: "Выбрано: {n}/4",
      actionConfidenceYes: "Уверенность: активна",
      actionConfidenceNo: "Уверенность: не выбрана",
      submit: "Отправить прогноз",
      submitUpdate: "Обновить прогноз",
      predLocked: "Прогнозы закрыты — матч начался",
      predLockedFinal: "Матч завершён",
      predSavedBadge: "Сохранено ✓",
      myBetsEmpty: "Пока нет прогнозов. Сделайте прогноз на главной.",
      myBetsNoPred: "Прогноз не сделан",
      myBetsTitle: "Мои прогнозы",
      betStatusLive: "LIVE",
      betStatusUpcoming: "Ожидание",
      betStatusFinal: "Завершён",
      betYourPred: "Ваш прогноз",
      betOutcome: "Исход",
      betScore: "Счёт",
      betTotal: "Тотал голов",
      betFirst: "Первый гол",
      betConfidence: "Уверенность",
      betXpEarned: "Заработано XP",
      betXpPending: "XP ожидает — матч не завершён",
      betXpNone: "+0 XP",
      betOutcomeHome: "Победа {team}",
      betOutcomeDraw: "Ничья",
      betOutcomeAway: "Победа {team}",
      betTotalOver: "Больше 2.5",
      betTotalUnder: "Меньше 2.5",
      betFirstHome: "{team}",
      betFirstAway: "{team}",
      betFirstNone: "Без голов",
      demoPlaceholder: "«{name}» — демо-заглушка.",
      statusLive: "LIVE",
      statusUpcoming: "Скоро",
      statusFinal: "Финал",
      statusNoData: "Нет live-данных",
      statusNoDataPill: "НЕТ ДАННЫХ",
      statusRaw: "СТАТУС",
      cardFootball: "Футбол",
      cardFeatured: "🔥 В центре",
      cardMetaLive: "Live • API-Football v3",
      cardMetaStatic: "Статика • прогнозы локально",
      cardMarketsLine: "4 рынка • +XP",
      cardPredict: "Прогноз",
      xpLiveBadge: "XP live",
      startsInSoon: "Скоро начало",
      startsInDays: "Через {n} дн.",
      startsInOneDay: "Через 1 дн.",
      startsInHours: "Через {n} ч",
      startsInMins: "Через {n} мин",
      winHome: "Победа {team}",
      draw: "Ничья",
      winAway: "Победа {team}",
      over25: "Больше 2.5",
      under25: "Меньше 2.5",
      noGoals: "Без голов",
      confOutcome: "Исход • {home} / {drawLabel} / {away}",
      confScore: "Точный счёт • {h}:{a}",
      confScorersUnset: "не задано",
      confTotal: "Всего голов • {v}",
      confFirst: "Первый гол • {v}",
      predSavedLive: "Прогноз сохранён: {summary}. XP начисляется после матча.",
      predSaved: "Прогноз сохранён: {summary}.",
      profileHi: "Привет, {name}",
      profileUpdated: "Профиль обновлён.",
      promptName: "Имя в приложении",
      matchEndXp: "Матч завершён. +{xp} XP — {parts}",
      matchEndNoXp: "Матч завершён. В этот раз без XP.",
      xpOutcome: "Исход +{n}",
      xpExact: "Счёт +{n}",
      xpTotal: "Тотал +{n}",
      xpFirst: "Первый гол +{n}",
      bannerLive: "Live",
      bannerFinal: "Финал",
      vs: "против"
    }
  };

  function getStoredLocale() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "ru" || v === "en") return v;
    } catch {
      /* ignore */
    }
    if (typeof navigator !== "undefined" && navigator.language && navigator.language.toLowerCase().startsWith("ru")) {
      return "ru";
    }
    return "en";
  }

  let currentLocale = getStoredLocale();

  function plTranslate(key, vars) {
    const v = vars && typeof vars === "object" ? vars : {};
    const table = STRINGS[currentLocale] || STRINGS.en;
    let s = table[key] ?? STRINGS.en[key] ?? key;
    for (const [k, val] of Object.entries(v)) {
      s = s.split(`{${k}}`).join(String(val));
    }
    return s;
  }

  function plGetLocale() {
    return currentLocale;
  }

  function plSetLocale(loc) {
    currentLocale = loc === "ru" ? "ru" : "en";
    try {
      localStorage.setItem(STORAGE_KEY, currentLocale);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLocale === "ru" ? "ru" : "en";
      const btn = document.getElementById("langToggle");
      if (btn) {
        btn.textContent = currentLocale === "ru" ? "EN" : "RU";
        btn.setAttribute("aria-label", currentLocale === "ru" ? "English" : "Русский");
      }
    }
    plApplyStatic();
    window.dispatchEvent(new CustomEvent("pl-locale-change"));
  }

  function plApplyStatic() {
    if (typeof document === "undefined") return;
    document.title = plTranslate("docTitle");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = plTranslate(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key && el instanceof HTMLInputElement) el.placeholder = plTranslate(key);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key) el.setAttribute("aria-label", plTranslate(key));
    });
    const btn = document.getElementById("langToggle");
    if (btn) {
      btn.textContent = currentLocale === "ru" ? "EN" : "RU";
      btn.setAttribute("aria-label", plTranslate("langHint"));
    }
  }

  window.plTranslate = plTranslate;
  window.plGetLocale = plGetLocale;
  window.plSetLocale = plSetLocale;
  window.plApplyStatic = plApplyStatic;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      document.documentElement.lang = currentLocale === "ru" ? "ru" : "en";
      plApplyStatic();
      document.getElementById("langToggle")?.addEventListener("click", () => {
        plSetLocale(currentLocale === "ru" ? "en" : "ru");
      });
    });
  } else {
    document.documentElement.lang = currentLocale === "ru" ? "ru" : "en";
    plApplyStatic();
    document.getElementById("langToggle")?.addEventListener("click", () => {
      plSetLocale(currentLocale === "ru" ? "en" : "ru");
    });
  }
})();
