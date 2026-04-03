import { build } from "esbuild";
import { config } from "dotenv";

config();

await build({
  entryPoints: ["web3/wallet-entry.mjs"],
  bundle: true,
  format: "iife",
  globalName: "PLWallet",
  outfile: "wallet.bundle.js",
  platform: "browser",
  legalComments: "none",
  define: {
    "__WC_PROJECT_ID__": JSON.stringify(process.env.WC_PROJECT_ID || ""),
    "global": "globalThis"
  },
  external: [
    "@metamask/connect-evm",
    "@base-org/account",
    "@safe-global/safe-apps-sdk",
    "@safe-global/safe-apps-provider",
    "@coinbase/wallet-sdk",
    "porto",
    "porto/internal"
  ]
});
