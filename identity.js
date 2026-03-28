/**
 * Optional identity snapshot for future SIWE / server sync / XP sync.
 * Patched by the wallet bundle when connected; app logic stays guest-first.
 */
(function (g) {
  const listeners = new Set();
  let snapshot = {
    walletAddress: null,
    chainId: null,
    connectionStatus: "disconnected",
    isConnected: false,
    isBase: false,
    isWrongNetwork: false
  };

  function emit() {
    listeners.forEach((fn) => {
      try {
        fn(snapshot);
      } catch {
        /* ignore */
      }
    });
  }

  g.PLIdentity = {
    getSnapshot() {
      return { ...snapshot };
    },
    /** @internal — called from wallet runtime */
    patch(next) {
      snapshot = { ...snapshot, ...next };
      emit();
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
