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
 * Wait for the specified number of milliseconds.
 */
export const sleep = async (ms: number = 250) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
