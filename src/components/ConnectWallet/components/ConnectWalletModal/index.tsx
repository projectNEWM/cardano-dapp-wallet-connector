import React, { FunctionComponent } from "react"
import { Button, Modal, Typography } from "elements"
import { useConnectWallet } from "hooks"
import { getSupportedWallets } from "utils";
import { icons } from "assets";
import { WalletInfo } from "common";

interface Props {
  readonly onClose: VoidFunction
}

const ConnectWalletModal: FunctionComponent<Props> = ({ onClose }) => {
  const { connect, error } = useConnectWallet()

  const supportedWallets = getSupportedWallets();

  const isAWalletInstalled = supportedWallets.find(({ isInstalled }) => {
    return isInstalled
  })

  const handleSelectWallet = (wallet: WalletInfo) => {
    if (wallet.isInstalled) {
      connect(wallet.id)
    } else {
      window.open(wallet.websiteUrl, "_blank", "noreferrer")
    }

    onClose()
  };

  return (
    <Modal 
      title={isAWalletInstalled ? "Connect your wallet" : "Install a wallet"}
      onClose={onClose}
    >
      {supportedWallets.length === 0 ? (
        <Typography style={{ textAlign: "center"}}>
          Cardano wallet extensions are currently only supported in Chrome and
          Brave browsers.
        </Typography>
      ) : (
        supportedWallets.map((wallet, idx) => {
          return (
            <div 
              key={wallet.id} 
              style={{ 
                marginBottom: idx < supportedWallets.length - 1 
                  ? "0.25rem" 
                  : 0,
              }}
            >
              <Button 
                iconRight={wallet.icon}
                onClick={() => handleSelectWallet(wallet)}
                isFullWidth
              >
                <div 
                  style={{ 
                    display: "flex" , 
                    flex: 1, 
                  }}>
                  <Typography 
                    style={{ 
                      fontSize: "16px", 
                      textTransform: "capitalize",
                    }}
                  >
                    { wallet.name }
                  </Typography>

                  {!wallet.isInstalled && isAWalletInstalled && (
                    <div 
                      style={{ 
                        display: "flex", 
                        flexDirection: "row", 
                        alignItems: "center",
                        opacity: 0.5,
                        marginLeft: "auto",
                        marginRight: "1rem",
                      }}
                    >
                      <Typography>
                        Not installed
                      </Typography>

                      <img 
                        src={icons.externalLink} 
                        style={{ 
                          width: 18,
                          height: 18,
                          marginLeft: "0.5rem",
                        }} 
                      />
                    </div>
                  )}
                </div>
              </Button>
            </div>
          )
        })
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