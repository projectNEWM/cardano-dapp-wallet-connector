import { WalletInfo, SupportedWallet, Browser } from "common";
import { isIOS, isAndroid, isMobile, browserName } from "react-device-detect";
import { GetSupportedWalletOptions } from "./types";

const supportedWallets: ReadonlyArray<WalletInfo> = [
  {
    id: SupportedWallet.vespr,
    name: "VESPR",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668760/vespr-logo_emqgo8.webp",
    extensionUrl: isIOS
      ? "https://apps.apple.com/pk/app/vespr-cardano-wallet/id1565749376"
      : isAndroid
      ? "https://play.google.com/store/apps/details?id=art.nft_craze.gallery.main&hl=en_US&gl=US&pli=1"
      : "https://chromewebstore.google.com/detail/vespr-wallet/bedogdpgdnifilpgeianmmdabklhfkcn",
    websiteUrl: "https://vespr.gitbook.io/vespr/introduction/about",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: true,
  },
  {
    id: SupportedWallet.nami,
    name: "Nami",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668811/nami-logo_reuohl.svg",
    extensionUrl: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    websiteUrl: "https://namiwallet.io/",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: false,
  },
  {
    id: SupportedWallet.eternl,
    name: "Eternl",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668366/eternl-logo_serw55.png",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    websiteUrl: "https://eternl.io/",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: false,
  },
  {
    id: SupportedWallet.cardwallet,
    name: "Cardwallet",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668906/cardwallet-logo_ddtpuv.svg",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/cwallet/apnehcjmnengpnmccpaibjmhhoadaico",
    websiteUrl: "https://cwallet.finance/",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: false,
  },
  {
    id: SupportedWallet.gerowallet,
    name: "GeroWallet",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668958/gero-wallet-logo_mf7i7f.png",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
    websiteUrl: "https://gerowallet.io/",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: false,
  },
  {
    id: SupportedWallet.typhon,
    name: "Typhon Wallet",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706668668/typhon-logo_jxwqoi.svg",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
    websiteUrl: "https://typhonwallet.io/",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: false,
  },
  {
    id: SupportedWallet.yoroi,
    name: "Yoroi",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706669030/yoroi-logo_t9ayqc.svg",
    extensionUrl:
      browserName === "Firefox"
        ? "https://addons.mozilla.org/en-US/firefox/addon/yoroi/"
        : "https://chromewebstore.google.com/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb",
    websiteUrl: "https://yoroi-wallet.com/",
    browsers: ["Chrome", "Brave", "Edge", "Firefox"],
    isMobile: false,
  },
  {
    id: SupportedWallet.lodeWallet,
    name: "LodeWallet",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706669067/lode-wallet-logo_lczldt.png",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/lodewallet/ikffplhknjhbfkgbhnionfklokakmknd",
    websiteUrl: "https://lodewallet.io/",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: false,
  },
  {
    id: SupportedWallet.nufi,
    name: "NuFi",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706669107/nufi-logo_iutlxs.svg",
    extensionUrl: "https://chrome.google.com/webstore/detail/nufi/gpnihlnnodeiiaakbikldcihojploeca",
    websiteUrl: "https://nu.fi/",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: false,
  },
  {
    id: SupportedWallet.begin,
    name: "Begin",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706669164/begin-logo_t0fu7d.webp",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/begin-wallet/nhbicdelgedinnbcidconlnfeionhbml",
    websiteUrl: "https://begin.is/",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: false,
  },
  {
    id: SupportedWallet.lace,
    name: "Lace",
    icon: "https://res.cloudinary.com/newm/image/upload/v1706669221/lace-logo_mhtvnb.svg",
    extensionUrl: "https://chrome.google.com/webstore/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk",
    websiteUrl: "https://www.lace.io/",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: false,
  },
  {
    id: SupportedWallet.tokeo,
    name: "Tokeo",
    icon: "https://res.cloudinary.com/newm/image/upload/v1733548441/tokeo-logo-icon_d9xzef.png",
    websiteUrl: "https://www.tokeopay.io/",
    browsers: [],
    isMobile: true,
  },
];

/**
 * @returns a list of Cardano wallets for the current device and
 * browser. Installed wallets appear before uninstalled wallets.
 *
 * @param omit optional list of wallets to omit from the returned list
 * @returns a list of available wallet objects
 */
const getSupportedWallets = (options?: GetSupportedWalletOptions): ReadonlyArray<WalletInfo> => {
  const installedWallets: Array<WalletInfo> = [];
  const uninstalledWallets: Array<WalletInfo> = [];

  supportedWallets.forEach((wallet) => {
    const currentBrowser = browserName as Browser;
    const isMobileWalletInstallable = wallet.isMobile && isMobile;
    const isBrowserExtensionWalletInstallable = wallet.browsers.includes(currentBrowser);

    if (options?.omit?.includes(wallet.id)) return;

    if (typeof window !== "undefined" && window.cardano?.[wallet.id]) {
      installedWallets.push({
        ...wallet,
        ...window.cardano[wallet.id],
        name: wallet.name, // use hard-coded name, some window object wallet names are innacurate
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
