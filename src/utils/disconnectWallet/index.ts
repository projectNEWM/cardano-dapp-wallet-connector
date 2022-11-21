import { storageKey, StorageType } from "common";

const disconnectWallet = (
  storageType = StorageType.LocalStorage,
) => {
  const selectedWalletName = window[storageType].getItem(storageKey);

  if (!selectedWalletName) return;

  if (window.Wallets && window.Wallets[selectedWalletName]) {
    delete window.Wallets[selectedWalletName];
  }

  window[storageType].removeItem(storageKey);
};

export default disconnectWallet;
