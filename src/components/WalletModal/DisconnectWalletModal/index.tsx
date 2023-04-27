import React, { FunctionComponent, MouseEvent } from "react";
import { Button, Modal, Typography } from "elements";
import { useConnectWallet } from "hooks";
import { WalletModalProps } from "../types";

const DisconnectWalletModal: FunctionComponent<WalletModalProps> = ({
  style = {},
  headerStyle = {},
  disconnectButtonStyle = {},
  isInverted = false,
  onClose,
}) => {
  const { wallet, disconnect } = useConnectWallet();

  const handleDisconnect = (event: MouseEvent) => {
    disconnect();
    onClose(event);
  };

  if (!wallet) {
    return null;
  }

  return (
    <Modal
      style={style}
      headerStyle={headerStyle}
      title={wallet.name}
      titleIcon={wallet.icon}
      isInverted={isInverted}
      onClose={onClose}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "0.75rem",
        }}
      >
        <Typography isInverted={isInverted}>Connected with {wallet.name}.</Typography>

        <Button
          onClick={handleDisconnect}
          style={{
            marginLeft: "0.5rem",
            justifyContent: "center",
            ...disconnectButtonStyle,
          }}
        >
          <Typography isInverted={isInverted}>Disconnect</Typography>
        </Button>
      </div>
    </Modal>
  );
};

export default DisconnectWalletModal;
