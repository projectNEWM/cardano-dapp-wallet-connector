import { WalletInfo, SupportedWallet } from "common";
import { isIOS, isMobile, browserName } from "react-device-detect";

const supportedWallets: ReadonlyArray<WalletInfo> = [
  {
    id: SupportedWallet.vespr,
    name: "vespr",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668760/vespr-logo_emqgo8.webp",
    extensionUrl: isIOS
      ? "https://apps.apple.com/pk/app/vespr-cardano-wallet/id1565749376"
      : "https://play.google.com/store/apps/details?id=art.nft_craze.gallery.main&hl=en_US&gl=US&pli=1",
    websiteUrl: "https://vespr.gitbook.io/vespr/introduction/about",
    isMobile: true,
  },
  {
    id: SupportedWallet.nami,
    name: "Nami",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668811/nami-logo_reuohl.svg",
    extensionUrl: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    websiteUrl: "https://namiwallet.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.eternl,
    name: "Eternl",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668366/eternl-logo_serw55.png",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    websiteUrl: "https://eternl.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.flint,
    name: "Flint",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668855/flint-logo_bjv3ha.svg",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    websiteUrl: "https://flint-wallet.com/",
    isMobile: false,
  },
  {
    id: SupportedWallet.cardwallet,
    name: "Cardwallet",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668906/cardwallet-logo_ddtpuv.svg",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/cwallet/apnehcjmnengpnmccpaibjmhhoadaico",
    websiteUrl: "https://cwallet.finance/",
    isMobile: false,
  },
  {
    id: SupportedWallet.gerowallet,
    name: "GeroWallet",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668958/gero-wallet-logo_mf7i7f.png",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
    websiteUrl: "https://gerowallet.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.typhon,
    name: "Typhon",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668668/typhon-logo_jxwqoi.svg",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
    websiteUrl: "https://typhonwallet.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.yoroi,
    name: "Yoroi",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706669030/yoroi-logo_t9ayqc.svg",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
    websiteUrl: "https://typhonwallet.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.lodeWallet,
    name: "LodeWallet",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706669067/lode-wallet-logo_lczldt.png",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/lodewallet/ikffplhknjhbfkgbhnionfklokakmknd",
    websiteUrl: "https://lodewallet.io/",
    isMobile: false,
  },
  {
    id: SupportedWallet.nufi,
    name: "nufi",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706669107/nufi-logo_iutlxs.svg",
    extensionUrl: "https://chrome.google.com/webstore/detail/nufi/gpnihlnnodeiiaakbikldcihojploeca",
    websiteUrl: "https://nu.fi/",
    isMobile: false,
  },
  {
    id: SupportedWallet.begin,
    name: "begin",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706669164/begin-logo_t0fu7d.webp",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/begin-wallet/nhbicdelgedinnbcidconlnfeionhbml",
    websiteUrl: "https://begin.is/",
    isMobile: false,
  },
  {
    id: SupportedWallet.lace,
    name: "lace",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706669221/lace-logo_mhtvnb.svg",
    extensionUrl: "https://chrome.google.com/webstore/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk",
    websiteUrl: "https://www.lace.io/",
    isMobile: false,
  },
];

/**
 * @returns a list of Cardano wallets for the current device and
 * browser. Installed wallets appear before uninstalled wallets.
 */
const getSupportedWallets = (): ReadonlyArray<WalletInfo> => {
  const installedWallets: Array<WalletInfo> = [];
  const uninstalledWallets: Array<WalletInfo> = [];
  const supportedBrowsers = ["Chrome", "Brave"];
  const isBrowserSupported = supportedBrowsers.includes(browserName);

  supportedWallets.forEach((wallet) => {
    const isMobileWalletInstallable = wallet.isMobile && isMobile;
    const isBrowserExtensionWalletInstallable = !wallet.isMobile && isBrowserSupported;

    if (typeof window !== "undefined" && window.cardano?.[wallet.id]) {
      installedWallets.push({
        ...wallet,
        ...window.cardano[wallet.id],
        isInstalled: true,
      });
    } else if (isMobileWalletInstallable || isBrowserExtensionWalletInstallable) {
      uninstalledWallets.push({
        ...wallet,
        isInstalled: false,
      });
    }
  });

  return [...installedWallets, ...uninstalledWallets];
};

export default getSupportedWallets;
