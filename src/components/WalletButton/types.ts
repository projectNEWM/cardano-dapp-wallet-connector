import { CSSProperties, MouseEvent } from "react";

export interface WalletButtonProps {
  /** Style for the button. */
  readonly style?: CSSProperties;
  /** Font family for the text. */
  readonly fontFamily?: string;
  /** True if text styles should be adjusted for a dark background. */
  readonly isInverted?: boolean;
  /** Called when the button is clicked. */
  readonly onClick?: (event: MouseEvent) => void;
}

export type ConnectWalletButtonProps = Omit<WalletButtonProps, "isInverted" | "fontFamily">;

export type DisconnectWalletButtonProps = Omit<WalletButtonProps, "isInverted" | "fontFamily">;
