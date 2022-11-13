import { EnabledWallet, SupportedWallet, UnenabledWallet } from "hooks";

export {};

declare global {
  interface Window {
    readonly cardano?: Record<SupportedWallets, UnenabledWallet>;
    Wallets?: Record<SupportedWallet, EnabledWallet>;
  }
}
