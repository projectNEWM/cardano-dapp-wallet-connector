import React, { FunctionComponent } from "react"
import { Button, Modal, Typography } from "elements"
import { useConnectWallet } from "hooks"
import { WalletModalProps } from "../types"

const DisconnectWalletModal: FunctionComponent<WalletModalProps> = ({ 
  style = {},
  headerStyle = {},
  disconnectButtonStyle = {},
  isInverted = false,
  onClose, 
}) => {
  const { wallet, disconnect } = useConnectWallet()

  const handleDisconnect = () => {
    disconnect()
    onClose()
  }

  if (!wallet) {
    return (
      <Modal 
        style={style}
        title="Something went wrong" 
        isInverted={isInverted}
        onClose={onClose}
      >
        <Typography isInverted style={{ textAlign: "center" }}>
          It looks like your wallet didn't connect successfully.
        </Typography>
      </Modal>
    )
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
        <Typography isInverted>
          Connected with {wallet.name}.
        </Typography>

        <Button 
          onClick={handleDisconnect}
          style={{ 
            marginLeft: "0.5rem",
            justifyContent: "center", 
            ...disconnectButtonStyle,
          }}
        >
          <Typography isInverted>
            Disconnect
          </Typography>
        </Button>
      </div>
    </Modal>
  )
}

export default DisconnectWalletModal