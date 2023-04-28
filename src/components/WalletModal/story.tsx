import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import WalletModal from "./index";

export default {
  title: "WalletModal",
  component: WalletModal,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
} as ComponentMeta<typeof WalletModal>;

export const Unstyled = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>My custom button</button>

      <WalletModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Styled = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>My custom button</button>

      <WalletModal
        isOpen={isOpen}
        onError={(error) => console.log("error: ", error)}
        onClose={() => setIsOpen(false)}
        style={{
          backgroundColor: "#1C1C1E",
        }}
        headerStyle={{
          backgroundColor: "#121214",
        }}
        disconnectButtonStyle={{
          border: "2px solid white",
        }}
        isInverted
      />
    </>
  );
};
