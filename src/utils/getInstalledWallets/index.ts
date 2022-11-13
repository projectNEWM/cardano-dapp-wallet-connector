import { supportedWallets } from "common/constants";
import { SupportedWallets } from "common/types";

/**
 * @returns a list of installed Cardano wallet extensions.
 */
export const getInstalledWallets = (): ReadonlyArray<string> => {
  if (!window.cardano) return [];

  return Object.keys(window.cardano).filter((walletName) =>
    Object.values(supportedWallets).includes(walletName as SupportedWallets),
  );
};
