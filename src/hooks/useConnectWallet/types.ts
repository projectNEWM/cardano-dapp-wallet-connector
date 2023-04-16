import { EnabledWallet, WalletInfo } from "common/types";

export interface UseConnectWalletResult {
  /** true if an operation is being performed */
  readonly isLoading: boolean;
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
  /** Get the ADA balance for the connected wallet */
  readonly getBalance: (callback: (balance: number) => void) => void;
  /** Get installable wallet extensions for the current browser */
  readonly getSupportedWallets: () => ReadonlyArray<WalletInfo>;
}
