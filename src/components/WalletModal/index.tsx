import React from "react";
import { useConnectWallet } from "hooks";
import { FunctionComponent } from "react";
import { WalletModalProps } from "./types";
import ConnectWalletModal from "./ConnectWalletModal";
import DisconnectWalletModal from "./DisconnectWalletModal";

const WalletModal: FunctionComponent<WalletModalProps> = ({
  style,
  fontFamily = "Arial",
  ...rest
}) => {
  const { wallet } = useConnectWallet();

  const modalStyle = { fontFamily, ...style };

  return !!wallet ? (
    <DisconnectWalletModal style={modalStyle} {...rest} />
  ) : (
    <ConnectWalletModal style={modalStyle} {...rest} />
  );
};

export default WalletModal;
