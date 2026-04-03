import {
  ConnectorAlreadyConnectedError,
  connect,
  disconnect,
  getConnection,
  getConnectors,
  reconnect,
  switchChain,
  watchConnection
} from "@wagmi/core";
import { createPlWagmiConfig, primaryChain, WC_PROJECT_ID } from "./wagmi-config.mjs";
import { BASE_MAINNET_ID, isSupportedPlChain } from "./chains.mjs";

let config;
let initPromise = null;

function notifyIdentity(conn) {
  const id = globalThis.PLIdentity;
  if (!id?.patch) return;
  const chainId = conn.chainId ?? null;
  const addr = conn.address ?? null;
  const connected = conn.status === "connected";
  id.patch({
    walletAddress: addr,
    chainId,
    connectionStatus: conn.status,
    isConnected: connected,
    isBase: chainId === BASE_MAINNET_ID,
    isWrongNetwork: connected && chainId != null && !isSupportedPlChain(chainId)
  });
}

function mapPublic(conn) {
  const chainId = conn.chainId ?? undefined;
  const connected = conn.status === "connected";
  return {
    status: conn.status,
    address: conn.address,
    chainId,
    isConnected: connected,
    isBase: chainId === BASE_MAINNET_ID,
    isWrongNetwork: connected && chainId != null && !isSupportedPlChain(chainId)
  };
}

export const BASE_CHAIN_ID = BASE_MAINNET_ID;

export async function initWalletRuntime() {
  if (config) return;
  if (initPromise) {
    await initPromise;
    return;
  }
  initPromise = (async () => {
    config = createPlWagmiConfig();
    await reconnect(config).catch(() => {});
    notifyIdentity(getConnection(config));
  })();
  try {
    await initPromise;
  } finally {
    initPromise = null;
  }
}

function requireConfig() {
  if (!config) throw new Error("Wallet runtime not initialized");
  return config;
}

export function getWalletState() {
  try {
    return mapPublic(getConnection(requireConfig()));
  } catch {
    return {
      status: "disconnected",
      address: undefined,
      chainId: undefined,
      isConnected: false,
      isBase: false,
      isWrongNetwork: false
    };
  }
}

export function subscribeWallet(callback) {
  const c = requireConfig();
  return watchConnection(c, {
    onChange(conn) {
      notifyIdentity(conn);
      callback(mapPublic(conn));
    }
  });
}

export async function connectBrowserWallet() {
  await initWalletRuntime();
  const c = requireConfig();
  const targetId = primaryChain.id;

  const list = getConnectors(c);
  const connector = list[0];
  if (!connector) {
    const hasEth = typeof window !== "undefined" && window.ethereum;
    throw new Error(
      hasEth ? "No wallet connector" : "No browser wallet (install MetaMask or Rabby)"
    );
  }

  const p = await connector.getProvider().catch(() => null);
  if (!p?.request) {
    throw new Error(
      "Wallet provider is not available — check that the site is allowed in Rabby/MetaMask"
    );
  }

  try {
    await connect(c, { connector });
  } catch (e) {
    const already =
      e instanceof ConnectorAlreadyConnectedError ||
      e?.name === "ConnectorAlreadyConnectedError";
    if (!already) throw e;
  }

  const conn = getConnection(c);
  if (conn.status !== "connected" || !conn.address) {
    throw new Error("Wallet connection did not complete");
  }

  if (conn.chainId !== targetId) {
    try {
      await switchChain(c, { chainId: targetId });
    } catch {
      /* отказ от смены сети — остаёмся подключёнными */
    }
  }
}

export async function disconnectWallet() {
  await disconnect(requireConfig());
}

export function isWalletConnectAvailable() {
  return Boolean(WC_PROJECT_ID);
}

export async function connectWalletConnect() {
  await initWalletRuntime();
  const c = requireConfig();
  const targetId = primaryChain.id;

  const list = getConnectors(c);
  const connector = list.find((cn) => cn.type === "walletConnect");
  if (!connector) {
    throw new Error("WalletConnect is not configured — set WC_PROJECT_ID");
  }

  try {
    await connect(c, { connector });
  } catch (e) {
    const already =
      e instanceof ConnectorAlreadyConnectedError ||
      e?.name === "ConnectorAlreadyConnectedError";
    if (!already) throw e;
  }

  const conn = getConnection(c);
  if (conn.status !== "connected" || !conn.address) {
    throw new Error("WalletConnect connection did not complete");
  }

  if (conn.chainId !== targetId) {
    try {
      await switchChain(c, { chainId: targetId });
    } catch {
      /* user declined network switch — stay connected */
    }
  }
}

export async function switchWalletToBase() {
  await switchChain(requireConfig(), { chainId: primaryChain.id });
}
