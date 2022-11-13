import { EnabledWallet, SupportedWallet, UneabledWallet } from "hooks/useConnectWallet/types";

export {};

declare global {
  interface Window {
    readonly cardano?: Record<SupportedWallets, UneabledWallet>,
    Wallets?: Record<SupportedWallet, EnabledWallet>,
  }
}