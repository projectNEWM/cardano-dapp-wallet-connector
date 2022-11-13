import { storageKey, EnabledWallet, StorageType } from "common";
import { useEffect, useState } from "react";
import { enableWallet, getEnabledWallet } from "utils";
import { UseConnectWalletOptions, UseConnectWalletResult } from "./types";

/**
 * Returns values and helpers for connecting and enabling
 * a Cardano wallet.
 */
const useConnectWallet = (
  { storageType = StorageType.LocalStorage }: UseConnectWalletOptions = {
    storageType: StorageType.LocalStorage,
  },
): UseConnectWalletResult => {
  const initialWalletName = window[storageType].getItem(storageKey);

  const [error, setError] = useState<Error | null>(null);
  const [walletName, setWalletName] = useState<string | null>(
    initialWalletName,
  );
  const [enabledWallet, setEnabledWallet] = useState<EnabledWallet | null>(
    null,
  );

  const connectWallet = (name: string) => {
    setWalletName(name);
  };

  const enableSelectedWallet = async () => {
    try {
      if (!walletName) return;

      // use existing wallet object if already connected and enabled
      const currentEnabledWallet = await getEnabledWallet(
        walletName,
        storageType,
      );
      if (currentEnabledWallet) {
        setEnabledWallet(currentEnabledWallet);
        return;
      }

      // enable a new wallet
      const enabledWallet = await enableWallet(walletName, storageType);
      setEnabledWallet(enabledWallet);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    }
  };

  useEffect(() => {
    enableSelectedWallet();
  }, [walletName]);

  return { wallet: enabledWallet, connectWallet, error };
};

export default useConnectWallet;
