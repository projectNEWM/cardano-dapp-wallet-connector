import { Button } from "elements"
import React, { FunctionComponent } from "react"
import { ConnectWalletButtonProps } from "../types"

const ConnectWalletButton: FunctionComponent<ConnectWalletButtonProps> = ({
  style = {},
  onClick,
}) => {

  return (
    <Button
        style={style}
        onClick={onClick}
      >
        Connect wallet
      </Button>
  )
}

export default ConnectWalletButton