import { CSSProperties } from "react"

export interface ModalProps {
  readonly onClose: VoidFunction
  readonly style?: CSSProperties
  readonly headerStyle?: CSSProperties
  readonly isInverted?: boolean
}