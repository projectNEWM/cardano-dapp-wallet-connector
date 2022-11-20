import { storageKey, StorageType } from "common";

const disconnectWallet = (
  storageType: StorageType,
  walletName?: string | null,
) => {
  const selectedWalletName =
    walletName || window[storageType].getItem(storageKey);

  if (!selectedWalletName) return;

  if (window.Wallets && window.Wallets[selectedWalletName]) {
    delete window.Wallets[selectedWalletName];
  }

  window[storageType].removeItem(storageKey);
};

export default disconnectWallet;
