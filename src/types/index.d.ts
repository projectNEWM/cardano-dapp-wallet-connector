import { SupportedWallet, UnenabledWallet } from "hooks";

export {};

declare global {
  interface Window {
    readonly cardano?: Record<SupportedWallet, UnenabledWallet>;
  }
}
