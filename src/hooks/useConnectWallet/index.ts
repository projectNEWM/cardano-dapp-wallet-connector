import { useCallback, useEffect } from "react";
import {
  disconnectWallet,
  enableWallet,
  getEnabledWallet,
  getWalletAddress,
  getWalletBalance,
  getSupportedWallets,
} from "utils";
import { UseConnectWalletResult } from "./types";
import { useStore } from "store";
import { APIErrorMessage } from "common";

/**
 * Returns values and helper functions for connecting, utlizing,
 * and enabling a Cardano wallet. Wallet state is shared throughout
 * all hook references.
 */
const useConnectWallet = (): UseConnectWalletResult => {
  const { state, setState } = useStore();

  const connect = useCallback((name: string) => {
    selectWallet(name);
  }, []);

  const disconnect = useCallback(() => {
    disconnectWallet();
    setState({
      ...state,
      enabledWallet: null,
    });
  }, [state]);

  const getAddress = useCallback(
    async (callback: (address: string) => void) => {
      try {
        setState({
          ...state,
          error: null,
          isLoading: true,
        });

        const address = await getWalletAddress(state.enabledWallet);
        callback(address);
      } catch (err) {
        if (err instanceof Error) {
          setState({
            ...state,
            error: err.message,
          });
        }
      } finally {
        setState({
          ...state,
          isLoading: true,
        });
      }
    },
    [state],
  );

  const getBalance = useCallback(
    async (callback: (balance: number) => void) => {
      try {
        setState({
          ...state,
          error: null,
          isLoading: true,
        });
        const balance = await getWalletBalance(state.enabledWallet);
        callback(balance);
      } catch (err) {
        if (err instanceof Error) {
          setState({
            ...state,
            error: err.message,
          });
        }
      } finally {
        setState({
          ...state,
          isLoading: false,
        });
      }
    },
    [state],
  );

  const selectWallet = useCallback(
    async (walletName: string) => {
      try {
        setState({
          ...state,
          error: null,
        });

        // use existing wallet object if already connected and enabled
        const currentEnabledWallet = await getEnabledWallet();
        if (currentEnabledWallet) {
          setState({
            ...state,
            enabledWallet: currentEnabledWallet,
          });
          return;
        }

        // if no wallet is enabled, ensure it is disconnected
        disconnectWallet();

        // enable a new wallet
        const enabledWallet = await enableWallet(walletName);
        setState({
          ...state,
          enabledWallet,
        });
      } catch (err) {
        // ignore error if user manually disconnected, otherwise update state with error message
        if (err instanceof Error && err.message !== APIErrorMessage.manualDisconnect) {
          setState({
            ...state,
            error: err.message,
          });
        }
      }
    },
    [state],
  );

  /**
   * Ensure isConnected stays in sync with presence of enabled wallet.
   */
  useEffect(() => {
    if (state.enabledWallet && !state.isConnected) {
      setState({ ...state, isConnected: true });
    }

    if (!state.enabledWallet && state.isConnected) {
      setState({ ...state, isConnected: false });
    }
  }, [state]);

  return {
    isConnected: state.isConnected,
    isLoading: state.isLoading,
    error: state.error,
    wallet: state.enabledWallet,
    connect,
    disconnect,
    getAddress,
    getBalance,
    getSupportedWallets,
  };
};

export default useConnectWallet;
