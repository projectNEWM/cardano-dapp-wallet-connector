import { useCallback, useEffect } from "react";
import {
  disconnectWallet,
  enableWallet,
  getWalletAddress,
  getWalletChangeAddress,
  getWalletBalance,
  getSupportedWallets,
  signWalletTransaction,
  getWalletTokenBalance,
} from "utils";
import { UseConnectWalletResult } from "./types";
import { getWallet, useStore } from "store";
import { APIErrorMessage, storageKey } from "common";
import { getInitialWalletName } from "utils/helpers";
import {
  getEnabledWalletMutex,
  selectWalletMutex,
  getAddressMutex,
  getChangeAddressMutex,
  getBalanceMutex,
  signTransactionMutex,
  getTokenBalanceMutex,
} from "./mutex";

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
    setState({
      isConnected: false,
      isLoading: false,
      enabledWallet: null,
      error: null,
    });

    disconnectWallet();
  }, []);

  const getAddress = useCallback(
    async (callback: (address: string) => void) => {
      if (getAddressMutex.isLocked()) {
        return;
      }

      const release = await getAddressMutex.acquire();

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

        release();
      }
    },
    [state.isConnected, state.enabledWallet],
  );

  const getChangeAddress = useCallback(
    async (callback: (address: string) => void) => {
      if (getChangeAddressMutex.isLocked()) {
        return;
      }

      const release = await getChangeAddressMutex.acquire();

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

        release();
      }
    },
    [state.isConnected, state.enabledWallet],
  );

  const getBalance = useCallback(
    async (callback: (balance: number) => void) => {
      if (getBalanceMutex.isLocked()) {
        return;
      }

      const release = await getBalanceMutex.acquire();

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

        release();
      }
    },
    [state.isConnected, state.enabledWallet],
  );

  const signTransaction = useCallback(
    async (tx: string, callback: (signedTx: string) => void, partialSign = false) => {
      if (signTransactionMutex.isLocked()) {
        return;
      }

      const release = await signTransactionMutex.acquire();

      try {
        setState({
          ...state,
          error: null,
          isLoading: true,
        });

        const signedTx = await signWalletTransaction(state.enabledWallet, tx, partialSign);

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

        release();
      }
    },
    [state.isConnected, state.enabledWallet],
  );

  const getTokenBalance = useCallback(
    async (policyId: string, callback: (balance: number) => void, tokenName?: string) => {
      if (getTokenBalanceMutex.isLocked()) {
        return;
      }

      const release = await getTokenBalanceMutex.acquire();

      try {
        setState({
          ...state,
          error: null,
          isLoading: true,
        });

        const balance = await getWalletTokenBalance(state.enabledWallet, policyId, tokenName);

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

        release();
      }
    },
    [state.isConnected, state.enabledWallet],
  );

  const selectWallet = useCallback(
    async (walletName: string) => {
      if (selectWalletMutex.isLocked()) {
        return;
      }

      const release = await selectWalletMutex.acquire();

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
      } finally {
        release();
      }
    },
    [state.isConnected, state.enabledWallet],
  );

  /**
   * If wallet should be connected but is not available in the state,
   * ensure that it is available and connected.
   */
  const getEnabledWallet = useCallback(async () => {
    if (getEnabledWalletMutex.isLocked()) {
      return;
    }

    const release = await getEnabledWalletMutex.acquire();

    const initialWalletName = getInitialWalletName();

    if (initialWalletName && state.isConnected && !state.enabledWallet) {
      const wallet = await getWallet();
      const isEnabled = await wallet?.isEnabled();

      if (!isEnabled) {
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
      } finally {
        release();
      }
    }
  }, [state.isConnected, state.enabledWallet]);

  /**
   * Ensure hook state responds to localStorage being changed from utils.
   */
  useEffect(() => {
    const syncHookState = () => {
      const walletName = getInitialWalletName();

      if (!state.isConnected && walletName) {
        selectWallet(walletName);
      }

      if (state.isConnected && !walletName) {
        setState({
          enabledWallet: null,
          isLoading: false,
          isConnected: false,
          error: null,
        });
      }
    };

    window.addEventListener(storageKey, syncHookState);

    return () => {
      window.removeEventListener(storageKey, syncHookState);
    };
  }, [state.isConnected]);

  /**
   * Initialize with previously connected wallet (if necessary) when hook mounts.
   */
  useEffect(() => {
    getEnabledWallet();
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
    getTokenBalance,
  };
};

export default useConnectWallet;
