import { storageKey } from "common/constants";
import { EnabledWallet, StorageType } from "common/types";
import { useEffect, useState } from "react";
import { getEnabledWallet } from "utils/getEnabledWallet";
import { UseConnectWalletOptions, UseConnectWalletResult } from "./types";

/**
 * Returns values and helpers for connecting and enabling 
 * a Cardano wallet.
 */
const useConnectWallet = ({ 
    storageType = StorageType.LocalStorage, 
  }: UseConnectWalletOptions = { 
    storageType: StorageType.LocalStorage,
  },
): UseConnectWalletResult => {
  const initialWalletName = localStorage.getItem(storageKey)

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [walletName, setWalletName] = useState<string | null>(initialWalletName)
  const [enabledWallet, setEnabledWallet] = useState<EnabledWallet | null>(null)
  const [error, setError] = useState<Error | null>(null);

  const connectWallet = (name: string) => {
    setWalletName(name)
  }

  const enableWallet = async () => {
    if (!walletName) return

    try {
      setIsLoading(true);

      if (!window.cardano) {
        throw new Error(
          `No wallet extensions have been installed. Please install a wallet
          extension and refresh the page.`
        )
      }

      // use existing wallet object if already connected and enabled
      const currentEnabledWallet = await getEnabledWallet(
        walletName, 
        storageType,
      )
      if (currentEnabledWallet) {
        setEnabledWallet(currentEnabledWallet)
        return
      }

      // no existing enabled wallet, enable a new wallet
      const selectedWallet = window.cardano[walletName];
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

      window[storageType].setItem(storageKey, walletName);
      if (!window.Wallets) window.Wallets = {}
      window.Wallets[walletName] = enabledWallet
      setEnabledWallet(enabledWallet)
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

  return { wallet: enabledWallet, connectWallet, isLoading, error };
};

export default useConnectWallet;
