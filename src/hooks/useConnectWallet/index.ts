import { useEffect, useState } from "react";
import {
  StorageType,
  SupportedWallets,
  UseConnectWalletOptions,
  UseConnectWalletResult,
} from "./types";

/**
 * Enables a Cardano object and adds it to a window.Wallets 
 * object when the walletName arguement is present. 
 */
const useConnectWallet = (
  walletName?: SupportedWallets,
  { 
    storageType = StorageType.LocalStorage, 
  }: UseConnectWalletOptions = { 
    storageType: StorageType.LocalStorage,
  },
): UseConnectWalletResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const enableWallet = async () => {
    if (!walletName) return
    
    try {
      setIsLoading(true);

      const selectedWallet = window.cardano[walletName];

      if (!selectedWallet) {
        throw new Error(
          `Wallet not found. Please ensure the wallet extension has been
            installed. If it was recently installed, you may need to refresh 
            the page and try again.`
        );
      }

      await selectedWallet.enable();

      window[storageType].setItem("walletName", walletName);
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

  return { isLoading, error };
};

export default useConnectWallet;
