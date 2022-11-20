import { browserName } from "react-device-detect";
import { SupportedWalletInfo, SupportedWallets } from "./types";
import { logos } from "assets";

export const storageKey = "walletkey";

export const supportedWallets:
  | Record<SupportedWallets, SupportedWalletInfo>
  | {} = ["Chrome", "Brave"].includes(browserName)
  ? {
      nami: {
        name: "Nami",
        logo: logos.nami,
        extensionUrl:
          "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
        websiteUrl: "https://namiwallet.io/",
      },
      eternl: {
        name: "Eternl",
        logo: logos.eternl,
        extensionUrl:
          "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
        websiteUrl: "https://eternl.io/",
      },
      flint: {
        name: "Flint",
        logo: logos.flint,
        extensionUrl:
          "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
        websiteUrl: "https://flint-wallet.com/",
      },
      cardwallet: {
        name: "Cardwallet",
        logo: logos.cardwallet,
        extensionUrl:
          "https://chrome.google.com/webstore/detail/cwallet/apnehcjmnengpnmccpaibjmhhoadaico",
        websiteUrl: "https://cwallet.finance/",
      },
      gerowallet: {
        name: "GeroWallet",
        logo: logos.geroWallet,
        extensionUrl:
          "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
        websiteUrl: "https://gerowallet.io/",
      },
    }
  : {};
