import { WalletInfo, SupportedWallet } from "common";
import { browserName } from "react-device-detect";
import { logos } from "assets";

/**
 * @returns a list of Cardano wallets. Installed wallets appear
 * before uninstalled wallets.
 */
const supportedWallets: ReadonlyArray<WalletInfo> = [
  {
    id: SupportedWallet.nami,
    name: "Nami",
    icon: logos.nami,
    extensionUrl: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    websiteUrl: "https://namiwallet.io/",
  },
  {
    id: SupportedWallet.eternl,
    name: "Eternl",
    icon: logos.eternl,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    websiteUrl: "https://eternl.io/",
  },
  {
    id: SupportedWallet.flint,
    name: "Flint",
    icon: logos.flint,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    websiteUrl: "https://flint-wallet.com/",
  },
  {
    id: SupportedWallet.cardwallet,
    name: "Cardwallet",
    icon: logos.cardwallet,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/cwallet/apnehcjmnengpnmccpaibjmhhoadaico",
    websiteUrl: "https://cwallet.finance/",
  },
  {
    id: SupportedWallet.gerowallet,
    name: "GeroWallet",
    icon: logos.geroWallet,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
    websiteUrl: "https://gerowallet.io/",
  },
];

const getSupportedWallets = (): ReadonlyArray<WalletInfo> => {
  if (!["Chrome", "Brave"].includes(browserName)) {
    return [];
  }

  const installedWallets: Array<WalletInfo> = [];
  const uninstalledWallets: Array<WalletInfo> = [];

  supportedWallets.forEach((wallet) => {
    if (window.cardano && window.cardano[wallet.id]) {
      installedWallets.push({
        ...wallet,
        ...window.cardano[wallet.id],
        isInstalled: true,
      });
    } else {
      uninstalledWallets.push({
        ...wallet,
        isInstalled: false,
      });
    }
  });

  return [...installedWallets, ...uninstalledWallets];
};

export default getSupportedWallets;
