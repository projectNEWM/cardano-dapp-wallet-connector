import { storageKey, StorageType } from "common";

/**
 * Helper to get a connected and enabled wallet.
 */
const getEnabledWallet = async (
  walletName?: string,
  storageType = StorageType.LocalStorage,
) => {
  const selectedWalletName = walletName || window[storageType].getItem(storageKey);

  if (!selectedWalletName || !window.Wallets) return;

  const wallet = window.Wallets[selectedWalletName];

  if (!wallet) return;

  const isEnabled = await wallet.isEnabled();

  if (isEnabled) {
    return wallet;
  } else {
    delete window.Wallets[selectedWalletName];
    window[storageType].removeItem(storageKey);
  }
};

export default getEnabledWallet;
