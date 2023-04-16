import { CSSProperties, MouseEvent } from "react";

export interface WalletModalProps {
  /** Called when the modal is closed. Defaults to closing the modal */
  readonly onClose: (event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
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
}

export type ConnectWalletModalProps = Omit<WalletModalProps, "fontFamily">;

export type DisconnectWalletModalProps = Omit<WalletModalProps, "fontFamily">;
