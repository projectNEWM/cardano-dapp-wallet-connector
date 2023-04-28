import { storageKey } from "common";
import { enableWallet } from "utils";
import { State } from "./types";
import { makeObservable, sleep } from "./utils";

const initialWalletName = localStorage.getItem(storageKey);

export const initialState: State = {
  isLoading: false,
  error: null,
  enabledWallet: null,
  isConnected: !!initialWalletName, // initialize as connected if wallet was connected previously
};

const store = makeObservable(initialState);

/**
 * Checks that the currently stored wallet is available on the window.cardano object.
 */
const getIsWalletAvailable = () => {
  return !!window.cardano && !!initialWalletName && !!window.cardano[initialWalletName];
};

/**
 * If wallet has been previously connected, check that wallet is available
 * on the window object up to 5 times and connect it.
 */
const initializeWallet = async () => {
  let isWalletAvailable = false;

  if (initialWalletName) {
    let retryCount = 0;

    // wallet may not be immediately available on initial render, check up to 5 times
    while (retryCount < 5) {
      isWalletAvailable = getIsWalletAvailable();

      // wallet object is present on window, no need to retry
      if (isWalletAvailable) break;

      retryCount += 1;

      await sleep();
    }

    // if wallet is not available on window after 5 tries, ensure connected state is false
    if (!isWalletAvailable) {
      store.set({ ...initialState, isConnected: false });
      return;
    }

    // if available, attempt to connect it
    try {
      const enabledWallet = await enableWallet(initialWalletName);
      store.set({ ...initialState, enabledWallet });
    } catch (err) {
      store.set({ ...initialState, isConnected: false });
    }
  }
};

initializeWallet();

export default store;
