import React, { FormEvent, useState } from "react";
import { FunctionComponent } from "react";
import { Button } from "elements";
import { useConnectWallet } from "hooks";
import { EnabledWallet } from "common";
import DisconnectWalletModal from "./components/DisconnectWalletModal";
import ConnectWalletModal from "./components/ConnectWalletModal";

interface Props {
  readonly onChange: (event: FormEvent<HTMLSelectElement>) => EnabledWallet
}

const ConnectWallet: FunctionComponent<Props> = () => {
  const { wallet } = useConnectWallet();

  const [isConnectModalVisible, setIsConnectModalVisible] = useState(false)
  const [isDisconnectModalVisible, setIsDisconnectModalVisible] = useState(false)

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
            Connect wallet
          </Button>
        ) : (
          <Button 
            iconLeft={wallet.icon} 
            onClick={() => setIsDisconnectModalVisible(true)}
          >
            Connected
          </Button>
        )}
      </div>
    </>
  )
};

export default ConnectWallet
