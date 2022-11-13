import { EnabledWallet } from "common/types"

export enum StorageType {
  LocalStorage = "localStorage",
  SessionStorage = "sessionStorage",
}

export interface UseConnectWalletOptions {
  readonly storageType?: StorageType
}

export interface UseConnectWalletResult {
  readonly isLoading: boolean
  readonly error: Error | null
  readonly wallet: EnabledWallet | null
} 