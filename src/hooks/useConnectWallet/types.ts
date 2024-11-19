import { EnabledWallet, WalletInfo } from "common/types";
import { GetSupportedWalletOptions } from "utils/getSupportedWallets/types";

export interface UseConnectWalletResult {
  /** true if an operation is being performed */
  readonly isLoading: boolean;
  /** true if wallet is connected */
  readonly isConnected: boolean;
  /** Error response from interacting with the wallet */
  readonly error: string | null;
  /** The enabled wallet API */
  readonly wallet: EnabledWallet | null;
  /** Connect wallet with the specified key */
  readonly connect: (walletName: string) => void;
  /** Disconnect the currently selected wallet */
  readonly disconnect: () => void;
  /** Get a receive address from the connected wallet */
  readonly getAddress: (callback: (address: string) => void) => void;
  /** Get a receive change address from the connected wallet */
  readonly getChangeAddress: (callback: (address: string) => void) => void;
  /** Get the ADA balance for the connected wallet */
  readonly getBalance: (callback: (balance: number) => void) => void;
  /** Get installable wallet extensions for the current browser */
  readonly getSupportedWallets: (options?: GetSupportedWalletOptions) => ReadonlyArray<WalletInfo>;
  /** Sign a transaction and return the full signed transaction */
  readonly signTransaction: (
    tx: string,
    callback: (signedTx: string) => void,
    partialSign?: boolean,
  ) => void;
  /** Get the wallet balance for a specific policy ID and optional hex encoded token name */
  readonly getTokenBalance: (
    policyId: string,
    callback: (balance: number) => void,
    tokenName?: string,
  ) => void;
}
