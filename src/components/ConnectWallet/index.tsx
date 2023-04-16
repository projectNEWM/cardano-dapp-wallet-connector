import React, { MouseEvent, useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { useConnectWallet } from "hooks";
import WalletModal from "components/WalletModal";
import { ConnectWalletProps } from "./types";
import WalletButton from "components/WalletButton";

const ConnectWallet: FunctionComponent<ConnectWalletProps> = ({
  onClickButton,
  onCloseModal,
  onConnect,
  mainButtonStyle = {},
  modalStyle = {},
  modalHeaderStyle = {},
  disconnectButtonStyle = {},
  fontFamily = "Arial",
  isInverted = false,
}) => {
  const { wallet } = useConnectWallet();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButtonClick = (event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (onClickButton) {
      onClickButton(event);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = (event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (onCloseModal) {
      onCloseModal(event);
    } else {
      setIsModalVisible(false);
    }
  };

  /**
   * Called when wallet is connected. Recommended to instead use
   * the useConnectWallet hook to access the wallet object.
   *
   * @returns CIP 30 wallet object
   */
  useEffect(() => {
    if (onConnect && wallet) {
      onConnect(wallet);
    }
  }, [onConnect, wallet]);

  return (
    <>
      {isModalVisible && (
        <WalletModal
          style={modalStyle}
          isInverted={isInverted}
          headerStyle={modalHeaderStyle}
          disconnectButtonStyle={disconnectButtonStyle}
          fontFamily={fontFamily}
          onClose={handleCloseModal}
        />
      )}

      <WalletButton style={mainButtonStyle} isInverted={isInverted} onClick={handleButtonClick} />
    </>
  );
};

export default ConnectWallet;
