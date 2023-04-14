import React, { FunctionComponent } from "react"
import { Button, Modal, Typography } from "elements"
import { useConnectWallet } from "hooks"
import { getAvailableWallets, getInstalledWallets } from "utils";

interface Props {
  readonly onClose: VoidFunction
}

const ConnectWalletModal: FunctionComponent<Props> = ({ onClose }) => {
  const { connect, error } = useConnectWallet()

  const availableWallets = getAvailableWallets();
  const installedWallets = getInstalledWallets();

  const handleConnectWallet = (walletId: string) => {
    connect(walletId)
    onClose()
  };

  const handleGoToWalletPage = (url: string) => {
    window.open(url, "_blank", "noreferrer")
  }

  return (
    <Modal title="Connect your wallet" onClose={onClose}>
      {Object.keys(availableWallets).length === 0 && (
        <Typography style={{ textAlign: "center"}}>
          Cardano wallet extensions are currently only supported in Chrome and
          Brave browsers.
        </Typography>
      )}

      {installedWallets.length === 0 && (
        <>
          <Typography style={{ marginLeft: "0.5rem", textAlign: "center" }}>
            Please install one of the following supported Cardano wallets:
          </Typography>

          <ul style={{ listStyleType: "none" }}>
            {availableWallets.map(({ id, name, logo, extensionUrl }) => (
              <li key={id} style={{ display: "flex", alignItems: "center" }}>
                <Button 
                  iconRight={logo}
                  onClick={ () => handleGoToWalletPage(extensionUrl)}
                  style={{ justifyContent: "space-between" }}
                  isFullWidth
                >
                  {name}
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}

      {installedWallets.length > 0 && (
        <>
          <Typography style={{ marginLeft: "0.5rem", marginBottom: "1rem" }}>
            Select an installed wallet:
          </Typography>

          {installedWallets.map(({ id, name, icon }, idx) => {
            return (
              <div 
                style={{ 
                  marginBottom: idx < installedWallets.length - 1 
                    ? "0.25rem" 
                    : 0,
                }}
              >
                <Button 
                  key={name} 
                  iconRight={icon}
                  onClick={() => handleConnectWallet(id)}
                  style={{ justifyContent: "space-between" }}
                  isFullWidth
                >
                  <Typography style={{ fontSize: "16px" }}>{ name }</Typography>
                </Button>
              </div>
            )
          })}
        </>
      )}

      {!!error && (
        <div style={{ marginTop: "1rem" }}>
          <Typography style={{ color: "red" }}>{error}</Typography>
        </div>
      )}
    </Modal>
  )
}

export default ConnectWalletModal