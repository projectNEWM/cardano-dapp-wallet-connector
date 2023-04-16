import { Button } from "elements"
import React, { FunctionComponent } from "react"
import { WalletButtonProps } from "../types"

const ConnectWalletButton: FunctionComponent<WalletButtonProps> = ({
  style = {},
  isInverted = false,
  onClick,
}) => {
  return (
    <Button
        style={{
          color: isInverted ? "#FFF" : "#333",
          ...style,
        }}
        onClick={onClick}
      >
        Connect wallet
      </Button>
  )
}

export default ConnectWalletButton