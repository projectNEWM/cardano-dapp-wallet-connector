import { useCallback, useEffect } from "react";
import {
  disconnectWallet,
  enableWallet,
  getWalletAddress,
  getWalletChangeAddress,
  getWalletBalance,
  getSupportedWallets,
  signWalletTransaction,
} from "utils";
import { UseConnectWalletResult } from "./types";
import { checkForEnabledWallet, useStore } from "store";
import { APIErrorMessage, storageKey } from "common";

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
          isLoading: false,
        });
      }
    },
    [state],
  );

  const getChangeAddress = useCallback(
    async (callback: (address: string) => void) => {
      try {
        setState({
          ...state,
          error: null,
          isLoading: true,
        });

        const address = await getWalletChangeAddress(state.enabledWallet);
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
          isLoading: false,
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

  const signTransaction = useCallback(
    async (tx: string, callback: (signTx: string) => void) => {
      try {
        setState({
          ...state,
          error: null,
          isLoading: true,
        });

        const signedTx = await signWalletTransaction(state.enabledWallet, tx);
        callback(signedTx);
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

        // enable wallet
        const enabledWallet = await enableWallet(walletName);
        setState({
          ...state,
          enabledWallet,
        });
      } catch (err) {
        disconnect();

        // ignore error message if user manually disconnected, otherwise update state
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
   * If wallet should be connected but is not available in the state,
   * ensure that it is available and connected.
   */
  const getEnabledWallet = useCallback(async () => {
    const initialWalletName = localStorage.getItem(storageKey);

    if (initialWalletName && state.isConnected && !state.enabledWallet) {
      const isWalletConnected = await checkForEnabledWallet();

      if (!isWalletConnected) {
        setState({ ...state, isConnected: false, error: "Unable to find connected wallet." });
        return;
      }

      // if available, attempt to connect it
      try {
        const enabledWallet = await enableWallet(initialWalletName);
        setState({ ...state, enabledWallet });
      } catch (err) {
        if (err instanceof Error) {
          setState({ ...state, isConnected: false, error: err.message });
        }
      }
    }
  }, [state]);

  /**
   * Initialize with previously connected wallet (if necessary) when hook mounts.
   */
  useEffect(() => {
    getEnabledWallet();
  }, []);

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
    getChangeAddress,
    getBalance,
    getSupportedWallets,
    signTransaction,
  };
};

export default useConnectWallet;
