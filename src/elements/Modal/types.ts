import { CSSProperties, HTMLAttributes, MouseEvent } from "react";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  readonly onClose: (event: MouseEvent) => void;
  readonly isInverted?: boolean;
  readonly title?: string;
  readonly titleIcon?: string;
  readonly style?: CSSProperties;
  readonly headerStyle?: CSSProperties;
  readonly fontFamily?: string;
}
