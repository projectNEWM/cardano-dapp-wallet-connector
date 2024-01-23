import { EnabledWallet, EnabledWalletApi, asyncTimeout, storageKey } from "common";

const enableWallet = async (name?: string): Promise<EnabledWallet> => {
  if (!window.cardano) {
    throw new Error(
      `No wallet extensions have been installed. Please install a wallet
      extension and refresh the page.`,
    );
  }

  const walletName = name || localStorage.getItem(storageKey);

  if (!walletName) {
    throw new Error("Wallet name must be passed as an argument or have been connected previously.");
  }

  const selectedWallet = window.cardano[walletName];

  if (!selectedWallet) {
    throw new Error(
      `Wallet not found. Please ensure the wallet extension has been
        installed. If it was recently installed, you may need to refresh 
        the page and try again.`,
    );
  }

  const enabledWalletAPI = await asyncTimeout<EnabledWalletApi>(
    selectedWallet.enable,
    "Enabling wallet timed out after 10 seconds",
    10000,
  );

  // combine enabled and selected wallet APIs so all fields are available
  const enabledWallet = Object.assign(Object.create(enabledWalletAPI), selectedWallet);

  // set active wallet name in local storage
  window.localStorage.setItem(storageKey, walletName);
  // dispatch event so hook can register changes
  window.dispatchEvent(new Event(storageKey));

  return enabledWallet;
};

export default enableWallet;
