import React from "react";
import { ComponentMeta } from "@storybook/react";
import ConnectWallet from "./index";

export default {
  title: "ConnectWallet",
  component: ConnectWallet,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
} as ComponentMeta<typeof ConnectWallet>;

export const Unstyled = () => (
  <ConnectWallet mainButtonStyle={{ background: "#FFF" }} />
);

export const Styled = () => (
  <ConnectWallet
    mainButtonStyle={{
      background: "linear-gradient(53.48deg, #41BE91 0%, #5091EB 100%)",
    }}
    modalHeaderStyle={{
      backgroundColor: "#121214",
    }}
    disconnectButtonStyle={{
      border: "2px solid white",
    }}
    isInverted
  />
);