import { ReactNode } from "react"

export interface TypographyProps {
  readonly variant?: TypographyVariants
  readonly children: ReactNode
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