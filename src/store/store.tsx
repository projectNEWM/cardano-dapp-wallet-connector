import { storageKey } from "common";
import { enableWallet } from "utils";
import { State } from "./types";
import { makeObservable, sleep } from "./utils";

export const initialState: State = {
  isLoading: false,
  error: null,
  enabledWallet: null,
  isConnected: !!localStorage.getItem(storageKey),
};

const store = makeObservable(initialState);

/**
 * Checks for up to 5 seconds that cardano object is populated on window.
 */
const checkForCardanoObject = async () => {
  let retryCount = 0;

  while (retryCount < 50) {
    if (!!window.cardano) return true;

    retryCount++;

    await sleep();
  }

  return false;
};

/**
 * Check that connected wallet is available on window.cardano object.
 */
const getIsWalletConnected = () => {
  const initialWalletName = localStorage.getItem(storageKey);

  if (!initialWalletName) {
    return false;
  }

  if (!window.cardano) {
    return false;
  }

  if (!window.cardano[initialWalletName]) {
    return false;
  }

  return true;
};

/**
 * Checks for up to 5 seconds that currently stored wallet is available on the window.
 */
const checkForConnectedWallet = async () => {
  let retryCount = 0;

  while (retryCount < 50) {
    const isEnabled = await getIsWalletConnected();

    if (isEnabled) return true;

    retryCount++;

    await sleep();
  }

  return false;
};

/**
 * If wallet has been previously connected, check that wallet is available
 * on the window object up to 5 seconds and connect it.
 */
const initializeWallet = async () => {
  const initialWalletName = localStorage.getItem(storageKey);

  // wait until cardano object is populated on window
  await checkForCardanoObject();

  // get enabled wallet if one should be available
  if (initialWalletName) {
    // check up to 5 seconds for wallet to be available on window
    const isWalletConnected = await checkForConnectedWallet();

    if (!isWalletConnected) {
      store.set({ ...initialState, isConnected: false, error: "Unable to find connected wallet." });
      return;
    }

    // if available, attempt to connect it
    try {
      const enabledWallet = await enableWallet(initialWalletName);
      store.set({ ...initialState, enabledWallet });
    } catch (err) {
      if (err instanceof Error) {
        store.set({ ...initialState, isConnected: false, error: err.message });
      }
    }
  }
};

initializeWallet();

export default store;
