import { browserName } from "react-device-detect";
import { AvailableWalletInfo, SupportedWallet } from "common/types";
import { logos } from "assets";

const availableWallets: ReadonlyArray<AvailableWalletInfo> = [
  {
    id: SupportedWallet.nami,
    name: "Nami",
    logo: logos.nami,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    websiteUrl: "https://namiwallet.io/",
  },
  {
    id: SupportedWallet.eternl,
    name: "Eternl",
    logo: logos.eternl,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    websiteUrl: "https://eternl.io/",
  },
  {
    id: SupportedWallet.flint,
    name: "Flint",
    logo: logos.flint,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    websiteUrl: "https://flint-wallet.com/",
  },
  {
    id: SupportedWallet.cardwallet,
    name: "Cardwallet",
    logo: logos.cardwallet,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/cwallet/apnehcjmnengpnmccpaibjmhhoadaico",
    websiteUrl: "https://cwallet.finance/",
  },
  {
    id: SupportedWallet.gerowallet,
    name: "GeroWallet",
    logo: logos.geroWallet,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
    websiteUrl: "https://gerowallet.io/",
  },
];

const getAvailableWallets = (): ReadonlyArray<AvailableWalletInfo> => {
  if (!["Chrome", "Brave"].includes(browserName)) {
    return [];
  }

  return availableWallets;
};

export default getAvailableWallets;
