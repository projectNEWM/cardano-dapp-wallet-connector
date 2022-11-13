import {
  EnabledWallet,
  SupportedWallet,
  UnenabledWallet,
} from "hooks/useConnectWallet/types";

export {};

declare global {
  interface Window {
    readonly cardano?: Record<SupportedWallets, UnenabledWallet>;
    Wallets?: Record<SupportedWallet, EnabledWallet>;
  }
}
