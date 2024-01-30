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
