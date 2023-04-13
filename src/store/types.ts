import { EnabledWallet } from "common";
import { ReactNode } from "react";

export interface ProviderProps {
  readonly children: ReactNode
}

export interface State {
  readonly isLoading: boolean
  readonly error: string | null
  readonly enabledWallet: EnabledWallet | null
}

export type Action =
  | { type: "setIsLoading", isLoading: boolean }
  | { type: "setError", error: string | null}
  | { type: "setSelectedWalletName", selectedWalletName: string | null }
  | { type: "setEnabledWallet", enabledWallet: EnabledWallet | null }