import { InstalledWalletInfo, SupportedWallet } from "common";

const supportedWallets = [
  {
    id: SupportedWallet.eternl,
    name: "Eternl",
  },
  {
    id: SupportedWallet.flint,
    name: "Flint",
  },
  {
    id: SupportedWallet.gerowallet,
    name: "Gerowallet",
  },
  {
    id: SupportedWallet.nami,
    name: "Nami",
  },
  {
    id: SupportedWallet.cardwallet,
    name: "Cardwallet",
  },
];

/**
 * @returns a list of installed Cardano wallet extensions.
 */
const getInstalledWallets = (): ReadonlyArray<InstalledWalletInfo> => {
  return supportedWallets.filter(
    (supportedWallet) => !!window.cardano && window.cardano[supportedWallet.id],
  );
};

export default getInstalledWallets;
