import React, { MouseEvent, FunctionComponent } from "react";
import { Button, Modal, Typography } from "elements";
import { useConnectWallet } from "hooks";
import { getSupportedWallets } from "utils";
import { icons } from "assets";
import { WalletInfo } from "common";
import { WalletModalProps } from "../types";

const ConnectWalletModal: FunctionComponent<WalletModalProps> = ({
  style = {},
  headerStyle = {},
  isInverted = false,
  backgroundOpacity = 0.5,
  isOpen,
  onClose,
}) => {
  const { connect } = useConnectWallet();

  const supportedWallets = getSupportedWallets();

  const isAWalletInstalled = supportedWallets.find(({ isInstalled }) => {
    return isInstalled;
  });

  const handleSelectWallet = (event: MouseEvent) => (wallet: WalletInfo) => {
    if (wallet.isInstalled) {
      connect(wallet.id);
    } else {
      window.open(wallet.websiteUrl, "_blank", "noreferrer");
    }

    onClose(event);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={style}
      headerStyle={headerStyle}
      title={isAWalletInstalled ? "Connect your wallet" : "Install a wallet"}
      onClose={onClose}
      isInverted={isInverted}
      backgroundOpacity={backgroundOpacity}
    >
      {supportedWallets.length === 0 ? (
        <Typography isInverted style={{ textAlign: "center" }}>
          Cardano wallet extensions are currently only supported in Chrome and Brave browsers.
        </Typography>
      ) : (
        supportedWallets.map((wallet, idx) => {
          return (
            <div
              key={wallet.id}
              style={{
                marginBottom: idx < supportedWallets.length - 1 ? "0.25rem" : 0,
              }}
            >
              <Button
                iconRight={wallet.icon}
                onClick={(event) => handleSelectWallet(event)(wallet)}
                isInverted={isInverted}
                isFullWidth
              >
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                  }}
                >
                  <Typography
                    isInverted={isInverted}
                    style={{
                      fontSize: "16px",
                      textTransform: "capitalize",
                    }}
                  >
                    {wallet.name}
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
                      <Typography isInverted={isInverted}>Not installed</Typography>

                      <div style={{ marginLeft: "0.5rem" }}>
                        <icons.ExternalLink
                          width={18}
                          height={18}
                          stroke={isInverted ? "#FFF" : "#333"}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Button>
            </div>
          );
        })
      )}
    </Modal>
  );
};

export default ConnectWalletModal;
