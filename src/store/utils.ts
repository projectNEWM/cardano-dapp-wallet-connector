import { storageKey } from "common";
import { Listener } from "./types";

export const makeObservable = <T>(target: T) => {
  let listeners: Array<Listener<T>> = [];
  let value = target;

  const get = () => {
    return value;
  };

  const set = (newValue: T) => {
    if (JSON.stringify(value) === JSON.stringify(newValue)) return;

    value = newValue;
    listeners.forEach((l) => l(value));
  };

  const subscribe = (listener: Listener<T>) => {
    listeners.push(listener);

    return () => unsubscribe(listener);
  };

  const unsubscribe = (listener: Listener<T>) => {
    listeners = listeners.filter((l) => l !== listener);
  };

  return {
    get,
    set,
    subscribe,
  };
};

/**
 * Checks for up to 5 seconds that currently stored wallet is available on the window.
 */
export const checkForInjectedWallet = async () => {
  let retryCount = 0;

  while (retryCount < 50) {
    const isEnabled = await getIsWalletAvailable();

    if (isEnabled) return true;

    retryCount++;

    await sleep();
  }

  return false;
};

/**
 * Check that a wallet name was stored in local storage and that the wallet
 * is available in the cardano window object.
 */
const getIsWalletAvailable = () => {
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
 * Wait for the specified number of milliseconds.
 */
const sleep = async (ms: number = 250) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
