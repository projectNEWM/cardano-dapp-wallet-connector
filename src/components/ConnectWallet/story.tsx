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

export const Unstyled = () => <ConnectWallet />;

export const Styled = () => (
  <ConnectWallet
    mainButtonStyle={{
      background: "linear-gradient(53.48deg, #41BE91 0%, #5091EB 100%)",
    }}
    modalStyle={{
      backgroundColor: "#1C1C1E",
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
