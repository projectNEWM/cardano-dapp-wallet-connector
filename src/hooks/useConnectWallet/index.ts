import { storageKey, EnabledWallet, StorageType } from "common";
import { useEffect, useState } from "react";
import { disconnectWallet, enableWallet, getEnabledWallet } from "utils";
import { UseConnectWalletOptions, UseConnectWalletResult } from "./types";

/**
 * Returns values and helper functions for connecting, utlizing,
 * and enabling a Cardano wallet.
 */
const useConnectWallet = (
  { storageType = StorageType.LocalStorage }: UseConnectWalletOptions = {
    storageType: StorageType.LocalStorage,
  },
): UseConnectWalletResult => {
  const initialWalletName = window[storageType].getItem(storageKey);

  const [error, setError] = useState<Error | null>(null);
  const [selectedWalletName, setSelectedWalletName] = useState<string | null>(
    initialWalletName,
  );
  const [enabledWallet, setEnabledWallet] = useState<EnabledWallet | null>(
    null,
  );

  const connect = (name: string) => {
    setSelectedWalletName(name);
  };

  const disconnect = () => {
    setSelectedWalletName(null);
    setEnabledWallet(null);
    disconnectWallet(storageType, selectedWalletName);
  };

  const enableSelectedWallet = async () => {
    try {
      if (!selectedWalletName) return;

      const currentEnabledWallet = await getEnabledWallet(
        selectedWalletName,
        storageType,
      );

      // use existing wallet object if already connected and enabled
      if (currentEnabledWallet) {
        setEnabledWallet(currentEnabledWallet);
        return;
      }

      // if wallet is no longer enabled, disconnect it
      disconnectWallet(storageType, selectedWalletName);

      // enable a new wallet
      const enabledWallet = await enableWallet(selectedWalletName, storageType);
      setEnabledWallet(enabledWallet);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    }
  };

  useEffect(() => {
    enableSelectedWallet();
  }, [selectedWalletName]);

  return { wallet: enabledWallet, connect, disconnect, error };
};

export default useConnectWallet;
