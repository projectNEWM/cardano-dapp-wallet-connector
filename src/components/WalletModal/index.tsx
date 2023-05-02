import React, { useEffect } from "react";
import { useConnectWallet } from "hooks";
import { FunctionComponent } from "react";
import { WalletModalProps } from "./types";
import ConnectWalletModal from "./ConnectWalletModal";
import DisconnectWalletModal from "./DisconnectWalletModal";
import { usePrevious } from "common";

const WalletModal: FunctionComponent<WalletModalProps> = ({
  style,
  onConnect,
  onError,
  fontFamily = "Arial",
  ...rest
}) => {
  const { wallet, isConnected, error } = useConnectWallet();
  const prevIsConnected = usePrevious(isConnected);

  const modalStyle = { fontFamily, ...style };

  /**
   * Call onConnect if isConnected changes to true.
   */
  useEffect(() => {
    if (onConnect && wallet && !prevIsConnected && isConnected) {
      onConnect(wallet);
    }
  }, [isConnected, wallet, prevIsConnected]);

  /**
   * Call onError if an error occurs.
   */
  useEffect(() => {
    if (onError && error) {
      onError(error);
    }
  }, [error]);

  return wallet ? (
    <DisconnectWalletModal style={modalStyle} {...rest} />
  ) : (
    <ConnectWalletModal style={modalStyle} {...rest} />
  );
};

export default WalletModal;
