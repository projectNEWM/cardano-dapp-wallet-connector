import { Button } from "elements";
import { useConnectWallet } from "hooks"
import React, { FunctionComponent } from "react"
import { DisconnectWalletButtonProps } from "../types";

const DisconnectWalletButton: FunctionComponent<DisconnectWalletButtonProps> = ({
  style,
  onClick,
}) => {
  const { wallet } = useConnectWallet()

  if (!wallet) return null;

  return (
    <Button
      style={style}
      iconLeft={wallet.icon} 
      onClick={onClick}
    >
      Connected
    </Button>
  )
}

export default DisconnectWalletButton