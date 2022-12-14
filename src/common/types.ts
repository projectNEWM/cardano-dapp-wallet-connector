export enum SupportedWallets {
  eternl = "eternl",
  flint = "flint",
  gerowallet = "gerowallet",
  nami = "nami",
  cardwallet = "cardwallet",
}

export interface SupportedWalletInfo {
  name: string;
  logo: string;
  extensionUrl: string;
  websiteUrl: string;
}

export enum StorageType {
  LocalStorage = "localStorage",
  SessionStorage = "sessionStorage",
}

export interface UnenabledWallet {
  readonly apiVersion: string;
  readonly name: string;
  readonly enable: () => Promise<EnabledWalletApi>;
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

export interface EnabledWalletApi {
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
  readonly getUsedAddresses: (paginate?: boolean) => Promise<Any>;
  readonly getUtxos: (amount?: number, paginate?: boolean) => Promise<Any>;
  readonly signData: (addr: string, sigStructure: string) => Promise<Any>;
  readonly signTx: (
    tx: Any,
    partialSign: boolean,
    createDebugTx: boolean,
  ) => Promise<Any>;
  readonly submitTx: (tx: Any) => Promise<Any>;
}

export type EnabledWallet = UnenabledWallet & EnabledWalletApi;

export enum NetworkMode {
  mainNet = 1,
  testNet = 0,
}

// TODO: replace usage of this type with actual definitions
type Any = any;
