import { storageKey, EnabledWallet, StorageType } from "common";
import { useCallback, useEffect, useState } from "react";
import {
  disconnectWallet,
  enableWallet,
  getEnabledWallet,
  getWalletAddress,
  getWalletBalance,
  getAvailableWallets,
  getInstalledWallets,
} from "utils";
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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
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
    disconnectWallet(storageType);
    setError(null);
  };

  const getAddress = useCallback(
    async (callback: (address: string) => void) => {
      try {
        setError(null);
        setIsLoading(true);

        const address = await getWalletAddress(enabledWallet);
        callback(address);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [enabledWallet],
  );

  const getBalance = useCallback(
    async (callback: (balance: number) => void) => {
      try {
        setError(null);
        setIsLoading(true);
        const balance = await getWalletBalance(enabledWallet);
        callback(balance);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [enabledWallet],
  );

  const enableSelectedWallet = async () => {
    try {
      if (!selectedWalletName) return;

      setError(null);

      const currentEnabledWallet = await getEnabledWallet(storageType);

      // use existing wallet object if already connected and enabled
      if (currentEnabledWallet) {
        setEnabledWallet(currentEnabledWallet);
        return;
      }

      // if wallet is no longer enabled, disconnect it
      disconnectWallet(storageType);

      // enable a new wallet
      const enabledWallet = await enableWallet(selectedWalletName, storageType);
      setEnabledWallet(enabledWallet);
    } catch (err) {
      setSelectedWalletName(null);
      setError(err);
    }
  };

  useEffect(() => {
    enableSelectedWallet();
  }, [selectedWalletName]);

  return {
    wallet: enabledWallet,
    connect,
    disconnect,
    isLoading,
    error,
    getAddress,
    getBalance,
    getAvailableWallets,
    getInstalledWallets,
  };
};

export default useConnectWallet;
