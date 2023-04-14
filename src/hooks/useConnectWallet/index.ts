import { useCallback } from "react";
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
import { useStore } from "store";

/**
 * Returns values and helper functions for connecting, utlizing,
 * and enabling a Cardano wallet.
 */
const useConnectWallet = (): UseConnectWalletResult => {
  const { state, setState } = useStore()

  const connect = (name: string) => {
    selectWallet(name);
  };

  const disconnect = () => {
    disconnectWallet();
    setState({
      ...state,
      enabledWallet: null,
    })
  };

  const getAddress = useCallback(
    async (callback: (address: string) => void) => {
      try {
        setState({
          ...state,
          error: null,
          isLoading: true,
        })

        const address = await getWalletAddress(state.enabledWallet);
        callback(address);
      } catch (err) {
        if (err instanceof Error) {
          setState({
            ...state,
            error: err.message
          })
        }
      } finally {
        setState({
          ...state,
          isLoading: true,
        })
      }
    },
    [state.enabledWallet],
  );

  const getBalance = useCallback(
    async (callback: (balance: number) => void) => {
      try {
        setState({
          ...state,
          error: null,
          isLoading: true,
        })
        const balance = await getWalletBalance(state.enabledWallet);
        callback(balance);
      } catch (err) {
        if (err instanceof Error) {
          setState({
            ...state,
            error: err.message,
          })
        }
      } finally {
        setState({
          ...state,
          isLoading: false,
        })
      }
    },
    [state.enabledWallet],
  );

  const selectWallet = async (walletName: string) => {
    try {
      setState({
        ...state,
        error: null,
      })

      // use existing wallet object if already connected and enabled
      const currentEnabledWallet = await getEnabledWallet();
      if (currentEnabledWallet) {
        setState({
          ...state,
          enabledWallet: currentEnabledWallet,
        })
        return;
      }

      // if wallet is no longer enabled, disconnect it
      disconnectWallet();

      // enable a new wallet
      const enabledWallet = await enableWallet(walletName);
      setState({
        ...state,
        enabledWallet,
      })
    } catch (err) {
      if (err instanceof Error) {
        setState({
          ...state,
          error: err.message,
        })
      }
    }
  };

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
