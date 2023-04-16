import { useConnectWallet } from "hooks"
import React, { FunctionComponent } from "react"
import ConnectWalletButton from "./ConnectWalletButton"
import DisconnectWalletButton from "./DisconnectWalletButton"
import { WalletButtonProps } from "./types"

const WalletButton: FunctionComponent<WalletButtonProps> = (props) => {
  const { wallet } = useConnectWallet()

  return (
    !!wallet ? (
      <DisconnectWalletButton {...props} />
    ) : (
      <ConnectWalletButton {...props} />
    )
  )
}

export default WalletButton