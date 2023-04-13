import { EnabledWallet } from "common";
import { useCallback, useContext, useEffect } from "react";
import { StateContext, DispatchContext } from "store";
import {
  disconnectWallet,
  enableWallet,
  getEnabledWallet,
  getWalletAddress,
  getWalletBalance,
  getAvailableWallets,
  getInstalledWallets,
} from "utils";
import { UseConnectWalletResult } from "./types";

/**
 * Returns values and helper functions for connecting, utlizing,
 * and enabling a Cardano wallet.
 */
const useConnectWallet = (): UseConnectWalletResult => {
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const setIsLoading = (isLoading: boolean) => {
    if (!dispatch) return

    dispatch({
      type: "setIsLoading",
      isLoading,
    })
  }

  const setError = (error: string | null) => {
    if (!dispatch) return

    dispatch({
      type: "setError",
      error,
    })
  }
  
  const setEnabledWallet = (enabledWallet: EnabledWallet | null) => {
    if (!dispatch) return
    
    dispatch({
      type: "setEnabledWallet",
      enabledWallet,
    })
  }

  const connect = (name: string) => {
    selectWallet(name);
  };

  const disconnect = () => {
    disconnectWallet();
    setEnabledWallet(null);
    setError(null);
  };

  const getAddress = useCallback(
    async (callback: (address: string) => void) => {
      try {
        setError(null);
        setIsLoading(true);

        const address = await getWalletAddress(state.enabledWallet);
        callback(address);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [state.enabledWallet],
  );

  const getBalance = useCallback(
    async (callback: (balance: number) => void) => {
      try {
        setError(null);
        setIsLoading(true);
        const balance = await getWalletBalance(state.enabledWallet);
        callback(balance);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [state.enabledWallet],
  );

  const selectWallet = async (walletName: string) => {
    try {
      setError(null);

      // use existing wallet object if already connected and enabled
      const currentEnabledWallet = await getEnabledWallet();
      if (currentEnabledWallet) {
        setEnabledWallet(currentEnabledWallet);
        return;
      }

      // if wallet is no longer enabled, disconnect it
      disconnectWallet();

      // enable a new wallet
      const enabledWallet = await enableWallet(walletName);
      setEnabledWallet(enabledWallet);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (!dispatch) {
      throw new Error(
        "No context found, did you wrap your app in the Provider?"
      );
    }
  }, [dispatch])

  return {
    wallet: state.enabledWallet,
    connect,
    disconnect,
    isLoading: state.isLoading,
    error: state.error,
    getAddress,
    getBalance,
    getAvailableWallets,
    getInstalledWallets,
  };
};

export default useConnectWallet;
