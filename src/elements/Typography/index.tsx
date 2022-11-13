import React, { FunctionComponent } from "react";
import { TypographyProps } from "./types";

const Typography: FunctionComponent<TypographyProps> = ({
  variant = "p",
  ...rest
}) => React.createElement(variant, rest);

export default Typography;
