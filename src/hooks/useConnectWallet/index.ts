import { storageKey } from "common/constants";
import { EnabledWallet } from "common/types";
import { useEffect, useState } from "react";
import {
  StorageType,
  UseConnectWalletOptions,
  UseConnectWalletResult,
} from "./types";

/**
 * Returns an enabled Cardano wallet object. Defaults to previously
 * connected wallet if no walletName argument is passed.
 */
const useConnectWallet = (
  walletName?: string,
  { 
    storageType = StorageType.LocalStorage, 
  }: UseConnectWalletOptions = { 
    storageType: StorageType.LocalStorage,
  },
): UseConnectWalletResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wallet, setWallet] = useState<EnabledWallet | null>(null)
  const [error, setError] = useState<Error | null>(null);

  const enableWallet = async () => {
    try {
      setIsLoading(true);

      if (!window.cardano) {
        throw new Error(
          `No wallet extenstion have been installed. Please install a wallet
          extension and refresh the page.`
        )
      }

      const selectedWalletName = walletName || localStorage.getItem(storageKey)
      if (!selectedWalletName) return

      // use existing wallet object if already connected and enabled
      const currentEnabledWallet = await getExistingEnabledWallet(
        selectedWalletName, 
        storageType,
      )
      if (currentEnabledWallet) {
        setWallet(currentEnabledWallet)
        return
      }

      // no existing enabled wallet, enable a new wallet object
      const selectedWallet = window.cardano[selectedWalletName];
      if (!selectedWallet) {
        throw new Error(
          `Wallet not found. Please ensure the wallet extension has been
            installed. If it was recently installed, you may need to refresh 
            the page and try again.`
        );
      }

      const enabledWalletApi = await selectedWallet.enable();
      const enabledWallet = {
        ...selectedWallet,
        ...enabledWalletApi,
      }

      window[storageType].setItem(storageKey, selectedWalletName);
      if (!window.Wallets) window.Wallets = {}
      window.Wallets[selectedWalletName] = enabledWallet
      setWallet(enabledWallet)
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    enableWallet();
  }, [walletName]);

  return { wallet, isLoading, error };
};

/**
 * Checks for an existing enabled wallet. If a wallet is found but is no
 * longer enabled, clears the wallet data.
 */
const getExistingEnabledWallet = async (
  walletName: string, 
  storageType: StorageType,
) => {
  if (!window.Wallets) {
    return null
  }
  
  const connectedWallet = window.Wallets && window.Wallets[walletName]

  if (!connectedWallet) {
    return null
  }

  const isEnabled = await connectedWallet.isEnabled()

  if (isEnabled) {
    return connectedWallet
  }

  delete window.Wallets[walletName]
  window[storageType].removeItem(storageKey)  
  return null
}

export default useConnectWallet;
