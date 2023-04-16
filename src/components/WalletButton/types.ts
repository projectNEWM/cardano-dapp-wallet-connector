import { CSSProperties, MouseEvent } from "react";

export interface WalletButtonProps {
  readonly style: CSSProperties
  readonly isInverted?: boolean
  readonly onClick?: (event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}