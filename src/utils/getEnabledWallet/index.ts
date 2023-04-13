import { EnabledWallet, storageKey } from "common";

/**
 * Helper to get a connected and enabled wallet.
 */
const getEnabledWallet = async (): Promise<EnabledWallet | undefined> => {
  const selectedWalletName = window.localStorage.getItem(storageKey);

  if (!selectedWalletName || !window.Wallets) return;

  const wallet = window.Wallets[selectedWalletName];

  if (!wallet) return;

  const isEnabled = await wallet.isEnabled();

  if (isEnabled) return wallet;

  return undefined;
};

export default getEnabledWallet;
