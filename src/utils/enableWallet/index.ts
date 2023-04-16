import { storageKey } from "common";

const enableWallet = async (walletName: string) => {
  if (!window.cardano) {
    throw new Error(
      `No wallet extensions have been installed. Please install a wallet
      extension and refresh the page.`,
    );
  }

  const selectedWallet = window.cardano[walletName];

  if (!selectedWallet) {
    throw new Error(
      `Wallet not found. Please ensure the wallet extension has been
        installed. If it was recently installed, you may need to refresh 
        the page and try again.`,
    );
  }

  const enabledWalletApi = await selectedWallet.enable();

  const enabledWallet = {
    ...selectedWallet,
    ...enabledWalletApi,
  };

  window.localStorage.setItem(storageKey, walletName);

  if (!window.Wallets) window.Wallets = {};
  window.Wallets[walletName] = enabledWallet;

  return enabledWallet;
};

export default enableWallet;
