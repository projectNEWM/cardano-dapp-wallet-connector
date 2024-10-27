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
 * Checks for up to 5 seconds that currently stored wallet is available on the window and enabled.
 */
export const checkForEnabledWallet = async () => {
  let retryCount = 0;

  while (retryCount < 10) {
    const isEnabled = await getIsWalletAvailable();

    if (isEnabled) return true;

    retryCount++;

    await sleep();
  }

  return false;
};

/**
 * Check that a wallet name was stored in local storage, is available in the
 * cardano window object, and is ready to enable automatically.
 */
const getIsWalletAvailable = async () => {
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

  const isEnabled = await window.cardano[initialWalletName].isEnabled();

  return isEnabled;
};

/**
 * Wait for the specified number of milliseconds.
 */
const sleep = async (ms: number = 500) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
