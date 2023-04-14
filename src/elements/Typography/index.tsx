import React, { FunctionComponent } from "react";
import { TypographyProps } from "./types";

const Typography: FunctionComponent<TypographyProps> = ({
  variant = "p",
  style = {},
  ...rest
}) => {
  return React.createElement(variant, {
    style: {
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      fontFamily: "Arial",
      fontSize: "1.2rem",
      ...style,
    },
    ...rest,
  });
};

export default Typography;
