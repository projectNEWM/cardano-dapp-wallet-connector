import React, { FunctionComponent } from "react"
import { Button, Modal } from "elements"
import { useConnectWallet } from "hooks"

interface Props {
  readonly onClose: VoidFunction
}

const DisconnectWalletModal: FunctionComponent<Props> = ({ onClose }) => {
  const { disconnect } = useConnectWallet()

  const handleClose = () => {
    disconnect()
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <Button 
        onClick={handleClose}
        style={{ padding: "1rem", justifyContent: "center" }}
        isFullWidth
      >
        Disconnect
      </Button>
    </Modal>
  )
}

export default DisconnectWalletModal