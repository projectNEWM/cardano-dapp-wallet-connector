import { storageKey } from "common";
import { enableWallet } from "utils";
import { State } from "./types";
import { makeObservable } from "./utils";

const initialWalletName = localStorage.getItem(storageKey);

export const initialState: State = {
  isLoading: false,
  error: null,
  enabledWallet: null,
  isConnected: !!initialWalletName,
};

const store = makeObservable(initialState);

/**
 * Initialize with currently enabled wallet.
 */
const initializeWallet = async () => {
  if (initialWalletName) {
    const enabledWallet = await enableWallet(initialWalletName);

    store.set({ ...initialState, enabledWallet });
  }
};

initializeWallet();

export default store;
