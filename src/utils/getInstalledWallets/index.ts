import { supportedWallets, SupportedWallets } from "common";

/**
 * @returns a list of installed Cardano wallet extensions.
 */
const getInstalledWallets = (): ReadonlyArray<string> => {
  if (!window.cardano) return [];

  return Object.keys(window.cardano).filter((walletName) =>
    Object.values(supportedWallets).includes(walletName as SupportedWallets),
  );
};

export default getInstalledWallets;
