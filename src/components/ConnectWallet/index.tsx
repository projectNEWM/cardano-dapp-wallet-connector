import React, { FormEvent, useState } from "react";
import { FunctionComponent } from "react";
import { Typography, Button } from "elements";
import { useConnectWallet } from "hooks";
import { EnabledWallet } from "common";
import DisconnectWalletModal from "./components/DisconnectWalletModal";
import ConnectWalletModal from "./components/ConnectWalletModal";

interface Props {
  readonly onChange: (event: FormEvent<HTMLSelectElement>) => EnabledWallet
}

const ConnectWallet: FunctionComponent<Props> = () => {
  const {
    wallet,
    connect,
    error,
    isLoading,
    getAvailableWallets,
    getInstalledWallets,
  } = useConnectWallet();

  const [isConnectModalVisible, setIsConnectModalVisible] = useState(false)
  const [isDisconnectModalVisible, setIsDisconnectModalVisible] = useState(false)

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    connect((event.target as HTMLSelectElement).value);
  };

  return (
    <>
      { isConnectModalVisible && (
        <ConnectWalletModal 
          onClose={ () => setIsConnectModalVisible(false)} 
        />
      )}
      
      { isDisconnectModalVisible && (
        <DisconnectWalletModal 
          onClose={ () => setIsDisconnectModalVisible(false)} 
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {!wallet ? (
          <Button onClick={() => setIsConnectModalVisible(true)}>
            <Typography>
              Connect wallet
            </Typography>
          </Button>
        ) : (
          <Button 
            iconLeft={wallet.icon} 
            onClick={() => setIsDisconnectModalVisible(true)}
          >
            <Typography>
              Connected
            </Typography>
          </Button>
        )}
      </div>
    </>
  )
};

export default ConnectWallet
