import { storageKey } from "common/constants";
import { StorageType } from "common/types";

/**
 * Helper to get a connected and enabled wallet.
 */
export const getEnabledWallet = async (
  walletName?: string,
  storageType = StorageType.LocalStorage,
) => {
  const selectedWallet = walletName || window[storageType].getItem(storageKey);

  if (!selectedWallet || !window.Wallets) return;

  const wallet = window.Wallets[selectedWallet];

  if (!wallet) return;

  const isEnabled = await wallet.isEnabled();

  if (isEnabled) {
    return wallet;
  } else {
    delete window.Wallets[selectedWallet];
    window[storageType].removeItem(storageKey);
  }
};
