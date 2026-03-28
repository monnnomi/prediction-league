/**
 * Base-focused chain config for wagmi / viem.
 * Primary: Base mainnet. Base Sepolia included for optional testnet use later.
 */
import { base, baseSepolia } from "viem/chains";

export const plChains = [base, baseSepolia];

export const primaryChain = base;

export const BASE_MAINNET_ID = base.id;

export const BASE_SEPOLIA_ID = baseSepolia.id;

export function isSupportedPlChain(chainId) {
  if (chainId == null) return false;
  return chainId === BASE_MAINNET_ID || chainId === BASE_SEPOLIA_ID;
}
