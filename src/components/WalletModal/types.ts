import { CSSProperties, MouseEvent } from "react"

export interface WalletModalProps {
  readonly onClose: (event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  readonly style?: CSSProperties
  readonly headerStyle?: CSSProperties
  readonly disconnectButtonStyle?: CSSProperties
  readonly fontFamily?: string
  readonly isInverted?: boolean
}