import { HTMLProps, ReactNode } from "react";

export interface TypographyProps extends HTMLProps<HTMLParagraphElement> {
  readonly variant?: TypographyVariants;
  readonly isInverted?: boolean;
  readonly children: ReactNode;
}

export enum TypographyVariants {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  p = "p",
}
