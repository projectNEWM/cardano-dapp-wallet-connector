import { useCallback, useEffect, useState } from "react";
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

  const [initialWalletName, setInitialWalletName] = useState(localStorage.getItem(storageKey));

  const connect = useCallback((name: string) => {
    selectWallet(name);
  }, []);

  const disconnect = useCallback(() => {
    disconnectWallet();
    setState({
      isConnected: false,
      isLoading: false,
      enabledWallet: null,
      error: null,
    });
  }, []);

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
            isLoading: false,
            error: err.message,
          });
        }
      } finally {
        setState({
          ...state,
          error: null,
          isLoading: false,
        });
      }
    },
    [state.isConnected, state.enabledWallet],
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
            isLoading: false,
            error: err.message,
          });
        }
      } finally {
        setState({
          ...state,
          error: null,
          isLoading: false,
        });
      }
    },
    [state.isConnected, state.enabledWallet],
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
            isLoading: false,
            error: err.message,
          });
        }
      } finally {
        setState({
          ...state,
          error: null,
          isLoading: false,
        });
      }
    },
    [state.isConnected, state.enabledWallet],
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
            isLoading: false,
            error: err.message,
          });
        }
      } finally {
        setState({
          ...state,
          error: null,
          isLoading: false,
        });
      }
    },
    [state.isConnected, state.enabledWallet],
  );

  const selectWallet = useCallback(
    async (walletName: string) => {
      try {
        setState({
          ...state,
          isLoading: true,
          error: null,
        });

        // enable wallet
        const enabledWallet = await enableWallet(walletName);
        setState({
          isConnected: true,
          isLoading: false,
          enabledWallet,
          error: null,
        });
      } catch (err) {
        disconnect();

        // ignore error message if user manually disconnected, otherwise update state
        if (err instanceof Error && err.message !== APIErrorMessage.manualDisconnect) {
          setState({
            enabledWallet: null,
            isConnected: false,
            isLoading: false,
            error: err.message,
          });
        }
      }
    },
    [state.isConnected, state.enabledWallet],
  );

  /**
   * If wallet should be connected but is not available in the state,
   * ensure that it is available and connected.
   */
  const getEnabledWallet = useCallback(async () => {
    if (initialWalletName && state.isConnected && !state.enabledWallet) {
      const isWalletConnected = await checkForEnabledWallet();

      if (!isWalletConnected) {
        setState({
          enabledWallet: null,
          isConnected: false,
          isLoading: false,
          error: "Unable to find connected wallet.",
        });
        return;
      }

      try {
        // if available, attempt to connect it, but only if it is already authorized
        const enabledWallet = await enableWallet(initialWalletName);
        setState({
          isConnected: true,
          isLoading: false,
          enabledWallet,
          error: null,
        });
      } catch (err) {
        if (err instanceof Error) {
          setState({
            enabledWallet: null,
            isConnected: false,
            isLoading: false,
            error: err.message,
          });
        }
      }
    }
  }, [state.isConnected, state.enabledWallet, initialWalletName]);

  /**
   * Initialize with previously connected wallet (if necessary) when hook mounts.
   */
  useEffect(() => {
    getEnabledWallet();
  }, []);

  /**
   * Ensure connected status stays in sync with local storage
   */
  useEffect(() => {
    if (!state.isConnected && initialWalletName) {
      selectWallet(initialWalletName);
    }

    if (state.isConnected && !initialWalletName) {
      setState({
        enabledWallet: null,
        isLoading: false,
        isConnected: false,
        error: null,
      });
    }
  }, [state.isConnected, initialWalletName]);

  /**
   * Ensure hook state responds to localStorage being changed from utils.
   */
  useEffect(() => {
    const updateInitialWalletName = () => {
      const walletName = localStorage.getItem(storageKey);
      setInitialWalletName(walletName);
    };

    window.addEventListener(storageKey, updateInitialWalletName);

    return () => {
      window.removeEventListener("storageKey", updateInitialWalletName);
    };
  }, []);

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
