import { SVGProps } from "common";
import React, { FunctionComponent } from "react";

const Close: FunctionComponent<SVGProps> = ({
  height = 24,
  width = 24,
  fill = "none",
  stroke = "currentColor",
}) => {
  return (
    <svg
      style={{ overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-x"
      viewBox={"0 0 24 24"}
    >
      <path d="M18 6L6 18"></path>
      <path d="M6 6L18 18"></path>
    </svg>
  );
}

export default Close;
