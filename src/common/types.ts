export enum SupportedWallet {
  eternl = "eternl",
  flint = "flint",
  gerowallet = "gerowallet",
  nami = "nami",
  cardwallet = "cardwallet",
  typhon = "typhoncip30",
  yoroi = "yoroi",
  lodeWallet = "LodeWallet",
  nufi = "nufi",
  vespr = "vespr",
  begin = "begin",
  lace = "lace",
}

export interface WalletInfo {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly extensionUrl: string;
  readonly websiteUrl: string;
  readonly isInstalled?: boolean;
  readonly isMobile?: boolean;
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
  readonly getUnusedAddresses: () => Promise<Array<string>>;
  readonly getUsedAddresses: (paginate?: boolean) => Promise<Array<string>>;
  readonly getUtxos: (amount?: string, paginate?: boolean) => Promise<Any>;
  readonly signData: (addr: string, sigStructure: string) => Promise<Any>;
  readonly signTx: (tx: string, partialSign?: boolean, createDebugTx?: boolean) => Promise<Any>;
  readonly submitTx: (tx: string) => Promise<Any>;
}

type FullWalletAPI = UnenabledWallet & EnabledWalletApi;
export interface EnabledWallet extends FullWalletAPI {
  readonly id: string;
}

export enum NetworkMode {
  mainNet = 1,
  testNet = 0,
}

export interface SVGProps {
  readonly height?: number;
  readonly width?: number;
  readonly fill?: string;
  readonly stroke?: string;
}

export enum APIErrorMessage {
  manualDisconnect = "The request was refused due to lack of access - e.g. wallet disconnects.",
}

// TODO: replace usage of this type with actual definitions
type Any = any;
