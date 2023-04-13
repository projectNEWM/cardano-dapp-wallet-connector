import { storageKey } from "common";

const disconnectWallet = () => {
  const selectedWalletName = window.localStorage.getItem(storageKey);

  if (!selectedWalletName) return;

  if (window.Wallets && window.Wallets[selectedWalletName]) {
    delete window.Wallets[selectedWalletName];
  }

  window.localStorage.removeItem(storageKey);
};

export default disconnectWallet;
