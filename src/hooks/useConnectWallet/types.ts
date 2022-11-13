import { EnabledWallet, StorageType } from "common/types";

export interface UseConnectWalletOptions {
  /** either local or session storage */
  readonly storageType?: StorageType;
}

export interface UseConnectWalletResult {
  /** error response from connecting and enabling the wallet */
  readonly error: Error | null;
  /** The enabled wallet API */
  readonly wallet: EnabledWallet | null;
  /** Function to connect a specific wallet */
  readonly connectWallet: (walletName: string) => void;
}
