import React, { FormEvent, useState } from "react";
import { FunctionComponent } from "react";
import Typography from "elements/Typography";
import useConnectWallet from "./index";

const Demo: FunctionComponent = () => {
  const {
    wallet,
    connect,
    disconnect,
    error,
    getAddress,
    getChangeAddress,
    getBalance,
    getTokenBalance,
    getSupportedWallets,
  } = useConnectWallet();

  const [address, setAddress] = useState<string>("");
  const [changeAddress, setChangeAddress] = useState<string>("");
  const [balance, setBalance] = useState<number | undefined>();
  const [newmBalance, setNewmBalance] = useState<number>();

  const supportedWallets = getSupportedWallets();

  const installedWallets = supportedWallets.filter((wallet) => wallet.isInstalled);

  const handleRecieveAddress = (addr: string) => {
    setAddress(addr);
  };

  const handleRecieveChangeAddress = (addr: string) => {
    setChangeAddress(addr);
  };

  const handleRecieveBalance = (balance: number) => {
    setBalance(balance);
  };

  const handleRecieveNewmBalance = (balance: number) => {
    setNewmBalance(balance);
  };

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    connect((event.target as HTMLSelectElement).value);
  };

  const handleDisconnectWallet = () => {
    setAddress("");
    setChangeAddress("");
    setBalance(undefined);
    setNewmBalance(undefined);
    disconnect();
  };

  if (Object.keys(supportedWallets).length === 0) {
    return (
      <Typography>
        Cardano wallet extensions are currently only supported in Chrome and Brave browsers.
      </Typography>
    );
  }

  return installedWallets.length === 0 ? (
    <>
      <Typography>Please install one of the following supported Cardano wallets:</Typography>

      <ul style={{ listStyleType: "none" }}>
        {supportedWallets.map(({ name, icon }) => (
          <li style={{ display: "flex", alignItems: "center" }} key={name}>
            <span style={{ marginRight: "1rem" }}>
              <img style={{ width: "16px", height: "16px" }} src={icon} />
            </span>
            {name}
          </li>
        ))}
      </ul>
    </>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {!!wallet && (
        <Typography style={{ marginBottom: "1rem" }}>
          Currently connected wallet: {wallet.name}
        </Typography>
      )}

      {!!address && <Typography style={{ marginBottom: "1rem" }}>Address: {address}</Typography>}

      {!!changeAddress && (
        <Typography style={{ marginBottom: "1rem" }}>Change address: {changeAddress}</Typography>
      )}

      {typeof balance === "number" && (
        <Typography style={{ marginBottom: "1rem" }}>Balance: &#x20B3; {balance}</Typography>
      )}

      {typeof newmBalance === "number" && (
        <Typography style={{ marginBottom: "1rem" }}>
          NEWM Balance: &#x19D; {newmBalance}
        </Typography>
      )}

      {!wallet && installedWallets.length > 0 && (
        <>
          <Typography style={{ marginBottom: "1rem" }}>Select an installed wallet:</Typography>

          <select onChange={handleChange}>
            <option />
            {installedWallets.map(({ id, name }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </>
      )}

      {!!wallet && (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => getAddress(handleRecieveAddress)}>Get address</button>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => getChangeAddress(handleRecieveChangeAddress)}>
              Get change address
            </button>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => getBalance(handleRecieveBalance)}>Get balance</button>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <button
              onClick={() =>
                getTokenBalance(
                  "682fe60c9918842b3323c43b5144bc3d52a23bd2fb81345560d73f63",
                  handleRecieveNewmBalance,
                  "4e45574d",
                )
              }
            >
              Get NEWM balance
            </button>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <button onClick={handleDisconnectWallet}>Disconnect wallet</button>
          </div>
        </div>
      )}

      {!!error && (
        <div style={{ marginTop: "1rem" }}>
          <Typography style={{ color: "red" }}>{error}</Typography>
        </div>
      )}
    </div>
  );
};

export default {
  title: "useConnectWallet",
  component: Demo,
};

export const Primary = () => <Demo />;
