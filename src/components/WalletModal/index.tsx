import React, { useEffect, useState } from "react";
import { useConnectWallet } from "hooks";
import { FunctionComponent } from "react";
import { WalletModalProps } from "./types";
import ConnectWalletModal from "./ConnectWalletModal";
import DisconnectWalletModal from "./DisconnectWalletModal";

const WalletModal: FunctionComponent<WalletModalProps> = ({
  style,
  onConnect,
  fontFamily = "Arial",
  ...rest
}) => {
  const { wallet, isConnected } = useConnectWallet();
  const [isInitialized, setIsInitialized] = useState(false);

  const modalStyle = { fontFamily, ...style };

  /**
   * Ignore initial isConnected state and then call onConnect if value changes to true.
   */
  useEffect(() => {
    if (onConnect && wallet && isInitialized && isConnected) {
      onConnect(wallet);
    }

    setIsInitialized(true);
  }, [isConnected, wallet]);

  return isConnected ? (
    <DisconnectWalletModal style={modalStyle} {...rest} />
  ) : (
    <ConnectWalletModal style={modalStyle} {...rest} />
  );
};

export default WalletModal;
