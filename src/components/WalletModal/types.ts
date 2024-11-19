import { EnabledWallet, WalletInfo } from "common";
import { CSSProperties, MouseEvent } from "react";

export interface WalletModalProps {
  /** True if the modal is open */
  readonly isOpen: boolean;
  /** Called when the modal is closed. */
  readonly onClose: (event: MouseEvent) => void;
  /** Style for the modal */
  readonly style?: CSSProperties;
  /** Style for the modal header */
  readonly headerStyle?: CSSProperties;
  /** Style for the disconnect button displayed in the DisconnectWalletModal component. */
  readonly disconnectButtonStyle?: CSSProperties;
  /** Font family to be used for the text. */
  readonly fontFamily?: string;
  /** True if text, icon, and hover styles should be adjusted for a dark background. */
  readonly isInverted?: boolean;
  /** Opacity of background overlay when modal is open */
  readonly backgroundOpacity?: number;
  /** List of wallets to omit from the list of available wallets */
  readonly omitWallets?: ReadonlyArray<WalletInfo["id"]>;
  /** Called when a wallet is connected */
  readonly onConnect?: (wallet: EnabledWallet) => void;
  /** Called when a wallet is connected */
  readonly onDisconnect?: () => void;
  /** Called when an error occurs */
  readonly onError?: (message: string) => void;
}

export type ConnectWalletModalProps = Omit<WalletModalProps, "fontFamily" | "onConnect">;

export type DisconnectWalletModalProps = Omit<WalletModalProps, "fontFamily" | "onConnect">;
