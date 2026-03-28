/**
 * Wagmi config — один injected-коннектор с явным выбором EIP-1193 провайдера.
 * multiInjectedProviderDiscovery выключен: иначе несколько коннекторов + window.ethereum
 * дают непредсказуемый порядок и «молчаливые» ошибки в Rabby/MetaMask.
 */
import {
  createConfig,
  createStorage,
  http,
  injected,
  noopStorage
} from "@wagmi/core";
import { plChains, primaryChain } from "./chains.mjs";

function browserLocalStorage() {
  if (typeof window === "undefined" || !window.localStorage) return noopStorage;
  const ls = window.localStorage;
  return {
    getItem(key) {
      return ls.getItem(key);
    },
    setItem(key, value) {
      try {
        ls.setItem(key, value);
      } catch {
        /* QuotaExceeded / private mode */
      }
    },
    removeItem(key) {
      ls.removeItem(key);
    }
  };
}

const plWagmiStorage = createStorage({
  key: "pl-prediction-league",
  storage: browserLocalStorage()
});

/**
 * При нескольких расширениях `window.ethereum` — агрегатор; выбираем конкретный провайдер.
 * Порядок: Rabby → «чистый» MetaMask → Coinbase extension → первый из списка.
 */
export function pickInjectedProvider(win) {
  const ethereum = win?.ethereum;
  if (!ethereum) return undefined;
  const providers = ethereum.providers;
  if (Array.isArray(providers) && providers.length > 0) {
    const realMetaMask = (p) =>
      Boolean(
        p?.isMetaMask &&
          !p?.isBraveWallet &&
          !p?.isRabby &&
          !p?.isCoinbaseWallet &&
          !p?.isPhantom
      );
    return (
      providers.find((p) => p?.isRabby) ||
      providers.find(realMetaMask) ||
      providers.find((p) => p?.coinbaseWalletExtension || p?.isCoinbaseWallet) ||
      providers[0]
    );
  }
  return ethereum;
}

export function createPlWagmiConfig() {
  return createConfig({
    chains: plChains,
    multiInjectedProviderDiscovery: false,
    connectors: [
      injected({
        shimDisconnect: false,
        target: {
          id: "pl-browser-wallet",
          name: "Browser wallet",
          provider: pickInjectedProvider
        }
      })
    ],
    storage: plWagmiStorage,
    transports: {
      [plChains[0].id]: http(),
      [plChains[1].id]: http()
    },
    ssr: false
  });
}

export { primaryChain };
