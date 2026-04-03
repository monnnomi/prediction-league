/**
 * Bundled entry — named exports become properties on global `PLWallet` (IIFE).
 * IMPORTANT: use named exports, NOT `export default`, otherwise esbuild wraps
 * them in { default: ... } and `window.PLWallet.connect` is undefined.
 */
import { BASE_SEPOLIA_ID } from "./chains.mjs";
import {
  BASE_CHAIN_ID,
  connectBrowserWallet,
  connectWalletConnect,
  disconnectWallet,
  getWalletState,
  initWalletRuntime,
  isWalletConnectAvailable,
  subscribeWallet,
  switchWalletToBase
} from "./wallet-runtime.mjs";

export { BASE_CHAIN_ID, BASE_SEPOLIA_ID };

export async function init() {
  await initWalletRuntime();
}

export const getState = getWalletState;
export const subscribe = subscribeWallet;
export const connect = connectBrowserWallet;
export const connectWC = connectWalletConnect;
export const hasWC = isWalletConnectAvailable;
export const disconnect = disconnectWallet;
export const switchToBase = switchWalletToBase;
