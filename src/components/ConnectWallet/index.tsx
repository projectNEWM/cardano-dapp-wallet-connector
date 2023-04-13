import React, { FormEvent, useState } from "react";
import { FunctionComponent } from "react";
import { Typography, Button } from "elements";
import { useConnectWallet } from "hooks";
import { EnabledWallet } from "common";
import DisconnectWalletModal from "./components/DisconnectWalletModal";

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

  const [isDisconnectModalVisible, setIsDisconnectModalVisible] = useState(false)

  const availableWallets = getAvailableWallets();
  const installedWallets = getInstalledWallets();

  const walletOptions = installedWallets.filter(
    (installedWallet) => installedWallet.id !== wallet?.name,
  );

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    connect((event.target as HTMLSelectElement).value);
  };

  if (Object.keys(availableWallets).length === 0) {
    return (
      <Typography>
        Cardano wallet extensions are currently only supported in Chrome and
        Brave browsers.
      </Typography>
    );
  }

  return installedWallets.length === 0 ? (
    <>
      <Typography>
        Please install one of the following supported Cardano wallets:
      </Typography>

      <ul style={{ listStyleType: "none" }}>
        {availableWallets.map(({ name, logo }) => (
          <li style={{ display: "flex", alignItems: "center" }} key={name}>
            <span style={{ marginRight: "1rem" }}>
              <img style={{ width: "16px", height: "16px" }} src={logo} />
            </span>
            {name}
          </li>
        ))}
      </ul>
    </>
  ) : (
    <>
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
        fontFamily: "Arial",
      }}
    >
      {!!wallet && (
        <Button onClick={() => setIsDisconnectModalVisible(true)}>
          <img 
            src={wallet.icon} 
            style={{ marginRight: "0.25rem", width: 26, height: 26 }} 
          />

          <Typography>
            { isLoading ? "Connecting" : "Connected" }
          </Typography>
        </Button>
      )}

      {!wallet && walletOptions.length > 0 && (
        <>
          <Typography style={{ marginBottom: "1rem" }}>
            Select an installed wallet:
          </Typography>

          <select onChange={handleChange}>
            <option />
            {walletOptions.map(({ id, name }) => {
              return <option key={id} value={id} label={name} />;
            })}
          </select>
        </>
      )}

      {!!error && (
        <div style={{ marginTop: "1rem" }}>
          <Typography style={{ color: "red" }}>{error.message}</Typography>
        </div>
      )}
    </div>
    </>
  );
};

export default ConnectWallet
