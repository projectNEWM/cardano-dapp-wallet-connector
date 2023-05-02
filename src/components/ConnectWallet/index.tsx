import React, { MouseEvent, useState } from "react";
import { FunctionComponent } from "react";
import WalletModal from "components/WalletModal";
import { ConnectWalletProps } from "./types";
import WalletButton from "components/WalletButton";

const ConnectWallet: FunctionComponent<ConnectWalletProps> = ({
  onClickButton,
  onCloseModal,
  onConnect,
  onError,
  mainButtonStyle = {},
  modalStyle = {},
  modalHeaderStyle = {},
  disconnectButtonStyle = {},
  fontFamily = "Arial",
  isInverted = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (event: MouseEvent) => {
    if (onClickButton) {
      onClickButton(event);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = (event: MouseEvent) => {
    if (onCloseModal) {
      onCloseModal(event);
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <WalletModal
        isOpen={isModalOpen}
        style={modalStyle}
        isInverted={isInverted}
        headerStyle={modalHeaderStyle}
        disconnectButtonStyle={disconnectButtonStyle}
        fontFamily={fontFamily}
        onConnect={onConnect}
        onError={onError}
        onClose={handleCloseModal}
      />

      <WalletButton style={mainButtonStyle} isInverted={isInverted} onClick={handleButtonClick} />
    </>
  );
};

export default ConnectWallet;
