export enum SupportedWallets {
  eternl = "eternl",
  flint = "flint",
  gerowallet = "gerowallet",
  nami = "nami",
  cardwallet = "cardwallet",
}

export enum StorageType {
  LocalStorage = "localStorage",
  SessionStorage = "sessionStorage",
}

export interface UseConnectWalletOptions {
  readonly storageType: StorageType
}

export interface UseConnectWalletResult {
  readonly isLoading: boolean
  readonly error: Error | null
}

export interface UneabledWallet {
  readonly apiVersion: "0.1.0";
  readonly name: "eternl";
  readonly enable: () => Promise<EnabledWallet>;
  readonly experimental: {
    readonly appVersion: {
      readonly major: number;
      readonly minor: number;
      readonly patch: number;
    };
  };
  readonly enableLogs: (enable: boolean) => Any;
  readonly icon: string;
  readonly isEnabled: () => Promise<boolean>;
}

export interface EnabledWallet {
  readonly experimental: {
    readonly appVersion: {
      readonly major: number;
      readonly minor: number;
      readonly patch: number;
    };
    readonly getCollateral: () => Promise<Any>;
    readonly getLockedUtxos: () => Promise<Any>;
    readonly syncAccount: () => Promise<Any>;
  };
  readonly getBalance: () => Promise<Any>;
  readonly getChangeAddress: () => Promise<Any>;
  readonly getCollateral: () => Promise<Any>;
  readonly getNetworkId: () => Promise<Any>;
  readonly getRewardAddresses: () => Promise<Any>;
  readonly getUnusedAddresses: () => Promise<Any>;
  readonly getUsedAddresses: (paginate: boolean) => Promise<Any>;
  readonly getUtxos: (
    amount?: number,
    paginate?: boolean
  ) => Promise<Any>;
  readonly signData: (
    addr: string,
    sigStructure: string
  ) => Promise<Any>;
  readonly signTx: (
    tx: Any,
    partialSign: boolean,
    createDebugTx: boolean
  ) => Promise<Any>;
  readonly submitTx: (tx: Any) => Promise<Any>;
}

// TODO: replace usage of this type with actual definitions
type Any = any; 