import { storageKey } from "common";
import { enableWallet } from "utils";
import { State } from "./types";
import { makeObservable } from "./utils";

export const initialState: State = {
  isLoading: false,
  error: null,
  enabledWallet: null,
}

const store = makeObservable(initialState)

/**
 * Initialize with currently enabled wallet.
 */
const initializeWallet = async () => {
  const initialWalletName = localStorage.getItem(storageKey)

  if (initialWalletName) {
    const enabledWallet = await enableWallet(initialWalletName)

    store.set({ ...initialState, enabledWallet })
  }
}

initializeWallet()

export default store