import React, { FormEvent, useState } from "react";
import { ComponentMeta } from "@storybook/react";
import { FunctionComponent } from "react";
import Typography from "elements/Typography";
import { getInstalledWallets } from "utils";
import { supportedWallets } from "common";
import useConnectWallet from "./index";

const Demo: FunctionComponent = () => {
  const { wallet, connect, disconnect, error, getAddress } = useConnectWallet();

  const [address, setAddress] = useState<string>("");

  const installedWallets = getInstalledWallets();

  const walletOptions = installedWallets.filter(
    (walletName) => walletName !== wallet?.name?.toLowerCase(),
  );

  const handleRecieveAddress = (addr: string) => {
    setAddress(addr);
  };

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    connect((event.target as HTMLSelectElement).value);
  };

  if (Object.keys(supportedWallets).length === 0) {
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
        {Object.values(supportedWallets).map(({ name, logo }) => (
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

      {!!address && (
        <Typography style={{ marginBottom: "1rem" }}>
          Address: {address}
        </Typography>
      )}

      {walletOptions.length > 0 && (
        <>
          <Typography style={{ marginBottom: "1rem" }}>
            Select an installed wallet:
          </Typography>

          <select onChange={handleChange}>
            <option />
            {walletOptions.map((option) => {
              return <option key={option}>{option}</option>;
            })}
          </select>
        </>
      )}

      {!!wallet && (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => getAddress(handleRecieveAddress)}>
              Get address
            </button>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => disconnect()}>Disconnect wallet</button>
          </div>
        </div>
      )}

      {!!error && (
        <Typography style={{ color: "red" }}>{error.message}</Typography>
      )}
    </div>
  );
};

export default {
  title: "useConnectWallet",
  component: Demo,
} as ComponentMeta<typeof Demo>;

export const Primary = () => <Demo />;
