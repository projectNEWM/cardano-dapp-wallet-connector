import { EnabledWallet, WalletInfo } from "common";
import { CSSProperties, MouseEvent } from "react";

export interface ConnectWalletProps {
  /** Style for the modal. */
  readonly modalStyle?: CSSProperties;
  /** Style for the modal header. */
  readonly modalHeaderStyle?: CSSProperties;
  /** Style for the button used to initiate connecting and disconnecting. */
  readonly mainButtonStyle?: CSSProperties;
  /** Style for disconnect button in the DisconnectWalletModal component. */
  readonly disconnectButtonStyle?: CSSProperties;
  /** Font family to be used throughout the component. */
  readonly fontFamily?: string;
  /** True if text, icon, and hover styles should be adjusted for a dark background. */
  readonly isInverted?: boolean;
  /** List of wallets to omit from the list of available wallets */
  readonly omitWallets?: ReadonlyArray<WalletInfo["id"]>;
  /** Called when button is clicked. Defaults opening wallet modal. */
  readonly onClickButton?: (event: MouseEvent) => void;
  /** Called when modal isClosed. Defaults to closing wallet modal. */
  readonly onCloseModal?: (event: MouseEvent) => void;
  /** Called when a wallet is connected. */
  readonly onConnect?: (wallet: EnabledWallet) => void;
  /** Called when a wallet is disconnected. */
  readonly onDisconnect?: () => void;
  /** Called when an error occurs. */
  readonly onError?: (message: string) => void;
}
