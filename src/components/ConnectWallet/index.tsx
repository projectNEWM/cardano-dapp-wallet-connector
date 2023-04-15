import React, { CSSProperties, useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { Button } from "elements";
import { useConnectWallet } from "hooks";
import { EnabledWallet } from "common";
import DisconnectWalletModal from "./components/DisconnectWalletModal";
import ConnectWalletModal from "./components/ConnectWalletModal";

export interface ConnectWalletProps {
  readonly modalStyle?: CSSProperties
  readonly modalHeaderStyle?: CSSProperties
  readonly mainButtonStyle?: CSSProperties
  readonly disconnectButtonStyle?: CSSProperties
  readonly fontFamily?: string
  readonly isInverted?: boolean;
  /** Called when a wallet is connected */
  readonly onConnect?: (wallet: EnabledWallet) => void
}

const ConnectWallet: FunctionComponent<ConnectWalletProps> = ({ 
  onConnect,
  mainButtonStyle = {},
  modalStyle = {},
  modalHeaderStyle = {},
  disconnectButtonStyle = {},
  fontFamily = "Arial",
  isInverted = false,
}) => {
  const { wallet } = useConnectWallet();

  const [isConnectModalVisible, setIsConnectModalVisible] = useState(false)
  const [isDisconnectModalVisible, setIsDisconnectModalVisible] = useState(false)

  /**
   * 
   */
  useEffect(() => {
    if (onConnect && wallet) {
      onConnect(wallet)
    }
  }, [onConnect, wallet])

  return (
    <>
      { isConnectModalVisible && (
        <ConnectWalletModal 
          style={{ ...modalStyle, fontFamily }}
          headerStyle={modalHeaderStyle}
          onClose={ () => setIsConnectModalVisible(false)} 
          isInverted={isInverted}
        />
      )}
      
      { isDisconnectModalVisible && (
        <DisconnectWalletModal 
          style={{ ...modalStyle, fontFamily }}
          headerStyle={modalHeaderStyle}
          disconnectButtonStyle={disconnectButtonStyle}
          onClose={ () => setIsDisconnectModalVisible(false)} 
          isInverted={isInverted}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {!wallet ? (
          <Button 
            style={{
              color: isInverted ? "#FFF" : "#333",
              ...mainButtonStyle,
            }}
            onClick={() => setIsConnectModalVisible(true)}
          >
            Connect wallet
          </Button>
        ) : (
          <Button 
            style={{
              color: isInverted ? "#FFF" : "#333",
              ...mainButtonStyle,}
            }
            iconLeft={wallet.icon} 
            onClick={() => setIsDisconnectModalVisible(true)}
          >
            Connected
          </Button>
        )}
      </div>
    </>
  )
};

export default ConnectWallet
