import { EnabledWallet, SupportedWallet, UnenabledWallet } from "hooks";

export {};

declare global {
  interface Window {
    readonly cardano?: Record<AvailableWallets, UnenabledWallet>;
    Wallets?: Record<SupportedWallet, EnabledWallet>;
  }
}
