import { useConnectWallet } from "hooks"
import React, { FunctionComponent } from "react"
import ConnectWalletButton from "./ConnectWalletButton"
import DisconnectWalletButton from "./DisconnectWalletButton"
import { WalletButtonProps } from "./types"

const WalletButton: FunctionComponent<WalletButtonProps> = ({ 
  style, 
  fontFamily, 
  isInverted,
  ...rest
}) => {
  const { wallet } = useConnectWallet()

  const buttonStyle = {
    fontFamily,
    color: isInverted ? "#FFF" : "#333",
    backgroundColor: "#FFF",
    ...style,
  }

  return (
    !!wallet ? (
      <DisconnectWalletButton style={buttonStyle} {...rest} />
    ) : (
      <ConnectWalletButton style={buttonStyle} {...rest} />
    )
  )
}

export default WalletButton