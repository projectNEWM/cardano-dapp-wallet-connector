import { WalletInfo, SupportedWallet } from "common";
import { logos } from "assets";
import { isIOS, isMobile, browserName } from "react-device-detect";

const supportedWallets: ReadonlyArray<WalletInfo> = [
  {
    id: SupportedWallet.nami,
    name: "Nami",
    icon: logos.nami,
    extensionUrl: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    websiteUrl: "https://namiwallet.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.eternl,
    name: "Eternl",
    icon: logos.eternl,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    websiteUrl: "https://eternl.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.flint,
    name: "Flint",
    icon: logos.flint,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    websiteUrl: "https://flint-wallet.com/",
    isMobile: false,
  },
  {
    id: SupportedWallet.cardwallet,
    name: "Cardwallet",
    icon: logos.cardwallet,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/cwallet/apnehcjmnengpnmccpaibjmhhoadaico",
    websiteUrl: "https://cwallet.finance/",
    isMobile: false,
  },
  {
    id: SupportedWallet.gerowallet,
    name: "GeroWallet",
    icon: logos.geroWallet,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
    websiteUrl: "https://gerowallet.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.typhon,
    name: "Typhon",
    icon: logos.typhon,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
    websiteUrl: "https://typhonwallet.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.yoroi,
    name: "Yoroi",
    icon: logos.yoroi,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
    websiteUrl: "https://typhonwallet.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.lodeWallet,
    name: "LodeWallet",
    icon: logos.lodeWallet,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/lodewallet/ikffplhknjhbfkgbhnionfklokakmknd",
    websiteUrl: "https://lodewallet.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.nufi,
    name: "nufi",
    icon: logos.nufi,
    extensionUrl: "https://chrome.google.com/webstore/detail/nufi/gpnihlnnodeiiaakbikldcihojploeca",
    websiteUrl: "https://nu.fi/",
    isMobile: false,
  },
  {
    id: SupportedWallet.begin,
    name: "begin",
    icon: logos.begin,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/begin-wallet/nhbicdelgedinnbcidconlnfeionhbml",
    websiteUrl: "https://begin.is/",
    isMobile: false,
  },
  {
    id: SupportedWallet.lace,
    name: "lace",
    icon: logos.lace,
    extensionUrl: "https://chrome.google.com/webstore/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk",
    websiteUrl: "https://www.lace.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.vespr,
    name: "vespr",
    icon: logos.vespr,
    extensionUrl: isIOS
      ? "https://apps.apple.com/pk/app/vespr-cardano-wallet/id1565749376"
      : "https://play.google.com/store/apps/details?id=art.nft_craze.gallery.main&hl=en_US&gl=US&pli=1",
    websiteUrl: "https://vespr.gitbook.io/vespr/introduction/about",
    isMobile: true,
  },
];

/**
 * @returns a list of Cardano wallets. Installed wallets appear
 * before uninstalled wallets.
 */
const getSupportedWallets = (): ReadonlyArray<WalletInfo> => {
  const installedWallets: Array<WalletInfo> = [];
  const uninstalledWallets: Array<WalletInfo> = [];

  supportedWallets.forEach((wallet) => {
    if (window?.cardano && window.cardano[wallet.id]) {
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

  // only display links to download wallets on Chrome and Brave browsers
  if (!["Chrome", "Brave"].includes(browserName) && installedWallets.length === 0) {
    return [];
  }

  return [...installedWallets, ...uninstalledWallets].filter(filterMobileWallets);
};

/**
 * @returns whether a wallet's mobile support matches the current device.
 */
const filterMobileWallets = (wallet: WalletInfo): boolean => wallet.isMobile === isMobile;

export default getSupportedWallets;
