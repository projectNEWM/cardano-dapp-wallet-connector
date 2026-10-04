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
  {
    id: SupportedWallet.oneAm,
    name: "1AM",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iNjQiIGZpbGw9IiMwMDAiLz48cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMiAzMikgc2NhbGUoMikiIGZpbGw9IiNmZmYiIGQ9Ik0yMi4zNDg3IDEuMzQ4NzZDMjkuODA2NyA0LjYxNzY4IDMzLjY5MTYgMTMuMTA5OSAzMS4wODg2IDIxLjAxNzFDMjguMzI3MyAyOS40MDUzIDE5LjMxIDMzLjk1OTMgMTAuOTQ4NiAzMS4xODg1QzIuNTg3MTUgMjguNDE3NyAtMS45NTI4MiAxOS4zNzExIDAuODA4NTQxIDEwLjk4MjlDMy40MDkxIDMuMDgzMTggMTEuNTU4MSAtMS40MTU5MSAxOS40ODI1IDAuNDAxMjI0TDE4LjU1NTQgMy4yMTczOUMxMi4xODY5IDEuOTA0OTUgNS42ODggNS41Njc0NSAzLjYwMDY3IDExLjkwODFDMS4zNTIxMSAxOC43Mzg2IDUuMDYyMDUgMjYuMTMxMSAxMS44NzA3IDI4LjM4NzRDMTguNjc5MyAzMC42NDM2IDI2LjA0ODIgMjYuOTIxMyAyOC4yOTY3IDIwLjA5MDlDMzAuMzg2NSAxMy43NDI3IDI3LjMzMDMgNi45MDkyNCAyMS40MjE4IDQuMTY0NDFMMjIuMzQ4NyAxLjM0ODc2Wk0yMC4wMjY4IDMuNjExNjJDMjAuNTA3NiAzLjc3MDk1IDIwLjk3MjkgMy45NTU4OCAyMS40MjE4IDQuMTY0NDFMMTYuOTAwMyAxNy44OTk0TDE0LjAzNDcgMTYuOTQ5OEwxOC41NTU0IDMuMjE3MzlDMTkuMDQ3MyAzLjMxODc4IDE5LjUzODUgMy40NDk4MSAyMC4wMjY4IDMuNjExNjJaIi8+PC9zdmc+Cg==",
    extensionUrl: "https://chromewebstore.google.com/detail/bphnkdkcnfhompoegfpgnkidcjfbojjp",
    websiteUrl: "https://1am.xyz/",
    browsers: ["Chrome", "Brave", "Edge"],
    isMobile: false,
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
