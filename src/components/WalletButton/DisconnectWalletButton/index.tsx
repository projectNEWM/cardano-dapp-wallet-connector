import { Button } from "elements";
import { useConnectWallet } from "hooks"
import React, { FunctionComponent } from "react"
import { WalletButtonProps } from "../types";

const DisconnectWalletButton: FunctionComponent<WalletButtonProps> = ({
  style,
  isInverted = false,
  onClick,
}) => {
  const { wallet } = useConnectWallet()

  if (!wallet) return null;

  return (
    <Button
      style={{
        color: isInverted ? "#FFF" : "#333",
        ...style,}
      }
      iconLeft={wallet.icon} 
      onClick={onClick}
    >
      Connected
    </Button>
  )
}

export default DisconnectWalletButton