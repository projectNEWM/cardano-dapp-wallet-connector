import { EnabledWallet, SupportedWallets, UneabledWallet } from "hooks/useConnectWallet/types";

export {};

declare global {
  interface Window {
    readonly cardano: Record<SupportedWallets, UneabledWallet>,
    readonly Wallets: Record<SupportedWallets, EnabledWallet>,
  }
}