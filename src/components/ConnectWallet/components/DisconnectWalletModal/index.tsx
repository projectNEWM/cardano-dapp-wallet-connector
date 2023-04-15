import React, { FunctionComponent } from "react"
import { Button, Modal, Typography } from "elements"
import { useConnectWallet } from "hooks"

interface Props {
  readonly onClose: VoidFunction
}

const DisconnectWalletModal: FunctionComponent<Props> = ({ onClose }) => {
  const { wallet, disconnect } = useConnectWallet()

  const handleDisconnect = () => {
    disconnect()
    onClose()
  }

  if (!wallet) {
    return (
      <Modal 
        title="Something went wrong" 
        onClose={onClose}
      >
        <Typography style={{ textAlign: "center" }}>
          It looks like your wallet didn't connect successfully.
        </Typography>
      </Modal>
    )
  }

  return (
    <Modal 
      title={wallet.name} 
      titleIcon={wallet.icon}
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
        <Typography>
          Currenty connected with {wallet.name}.
        </Typography>

        <Button 
          onClick={handleDisconnect}
          style={{ 
            marginLeft: "0.5rem",
            padding: "1rem", 
            justifyContent: "center", 
          }}
        >
          <Typography>
            Disconnect
          </Typography>
        </Button>
      </div>
    </Modal>
  )
}

export default DisconnectWalletModal