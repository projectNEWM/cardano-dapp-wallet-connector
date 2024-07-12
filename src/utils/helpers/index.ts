import { bech32 } from "bech32";
import { NetworkMode, storageKey } from "common";
import { Buffer } from "buffer";

export const addressFromHex = (hex: string) => {
  const networkId = hex[1] === "0" ? NetworkMode.testNet : NetworkMode.mainNet;
  const prefix = networkId === NetworkMode.testNet ? "addr_test" : "addr";

  const bytes = fromHex(hex);
  const words = bech32.toWords(bytes);

  return bech32.encode(prefix, words, 1000);
};

export const fromHex = (hex: string): Buffer => {
  return Buffer.from(hex, "hex");
};

/**
 * References localStorage to get stored wallet key with a check to
 * avoid Next.js server-side error where window is not defined.
 *
 * @returns the stored wallet key string or null
 */
export const getInitialWalletName = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(storageKey);
  }

  return null;
};

/**
 * Merges the keys and values from two signature maps into a single map.
 *
 * @returns map with entries from both signature maps
 */
export const mergeSignatureMaps = (
  a: Map<number, Array<Array<number>>> = new Map(),
  b: Map<number, Array<Array<number>>> = new Map(),
): Map<number, Array<Array<number>>> => {
  const merged = new Map();

  a.forEach((value, key) => {
    merged.set(key, value);
  });

  b.forEach((value, key) => {
    const existingValue = merged.get(key);

    if (!existingValue) {
      merged.set(key, value);
    } else {
      merged.set(key, [...existingValue, ...value]);
    }
  });

  return merged;
};
