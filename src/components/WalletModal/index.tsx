import React from "react";
import { useConnectWallet } from "hooks";
import { FunctionComponent } from "react";
import { WalletModalProps } from "./types";
import ConnectWalletModal from "./ConnectWalletModal";
import DisconnectWalletModal from "./DisconnectWalletModal";

const WalletModal: FunctionComponent<WalletModalProps> = (props) => {
  const { wallet } = useConnectWallet()

  return !!wallet ? (
    <DisconnectWalletModal {...props} />
  ) : (
    <ConnectWalletModal {...props} />
  );
}

export default WalletModal