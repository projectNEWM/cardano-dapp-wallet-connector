import { SVGProps } from "common";
import React, { FunctionComponent } from "react";

const ExternalLink: FunctionComponent<SVGProps> = ({
  width = 24,
  height = 24,
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
      className="feather feather-external-link"
      viewBox="0 0 24 24"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
      <path d="M15 3L21 3 21 9"></path>
      <path d="M10 14L21 3"></path>
    </svg>
  );
};

export default ExternalLink;
