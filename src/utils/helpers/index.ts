import { bech32 } from "bech32";
import { NetworkMode, storageKey } from "common";
import { Buffer } from "buffer";
import { encode, decode } from "cbor-web";

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
 * Merges the keys and values from two signature maps into a single map. Ensures
 * no duplicate signatures in the event that a wallet included existing transaction
 * signatures in the sign transaction return value.
 *
 * @returns map with entries from both signature maps
 */
export const mergeSignatureMaps = (
  a: Map<number, Array<Array<Array<number>>>>,
  b: Map<number, Array<Array<Array<number>>>>,
): Map<number, Array<Array<Array<number>>> | Set<Array<Array<number>>>> => {
  const result = new Map<number, Array<Array<Array<number>>> | Set<Array<Array<number>>>>();

  // Set result to initial map
  a.forEach((value, key) => {
    result.set(key, value);
  });

  // Iterate through second map and update result with unique signatures from each
  b.forEach((value, key) => {
    const uniqueSignatureObj: Record<string, Array<number>> = {};
    const uniqueSignatureSet = new Set<Array<Array<number>>>();

    const existingValue = result.get(key);

    // No existing signatures, insert new signatures and continue
    if (!existingValue) {
      result.set(key, value);
      return;
    }

    // Existing signatures, create a object of unique signatures from both maps
    value.forEach(([k, v]) => {
      const encodedKey = encode(k).toString("hex");
      uniqueSignatureObj[encodedKey] = v;
    });
    existingValue.forEach(([k, v]) => {
      const encodedKey = encode(k).toString("hex");
      uniqueSignatureObj[encodedKey] = v;
    });

    // Convert unique signature object to a set
    Object.entries(uniqueSignatureObj).forEach(([k, v]) => {
      const decodedKey = decode(k);
      uniqueSignatureSet.add([decodedKey, v]);
    });

    // Update result with combined signature array
    result.set(key, uniqueSignatureSet);
  });

  return result;
};
