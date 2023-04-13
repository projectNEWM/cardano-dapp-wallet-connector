import React from "react";
import { ComponentMeta } from "@storybook/react";
import { FunctionComponent } from "react";
import ConnectWallet from "./index";

const Demo: FunctionComponent = () => {
  return (
    <ConnectWallet />
  )
};

export default {
  title: "ConnectWallet",
  component: Demo,
} as ComponentMeta<typeof Demo>;

export const Primary = () => <Demo />;
