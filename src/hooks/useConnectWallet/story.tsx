import React, { FormEvent } from "react";
import { ComponentMeta } from "@storybook/react";
import { FunctionComponent } from "react";
import Typography from "elements/Typography";
import { getInstalledWallets } from "utils";
import { supportedWallets } from "common";
import useConnectWallet from "./index";

const Demo: FunctionComponent = () => {
  const { wallet, connectWallet, error } = useConnectWallet();

  const installedWallets = getInstalledWallets();

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    connectWallet((event.target as HTMLSelectElement).value);
  };

  return installedWallets.length === 0 ? (
    <>
      <Typography>
        Please install one of the following supported Cardano wallets:
      </Typography>

      <ul>
        {supportedWallets.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </>
  ) : (
    <>
      {!!wallet && (
        <Typography>Currently connected wallet: {wallet.name}</Typography>
      )}

      <Typography>Select an installed wallet:</Typography>

      <select onChange={handleChange}>
        <option />
        {installedWallets
          .filter((walletName) => walletName !== wallet?.name)
          .map((option) => {
            return <option key={option}>{option}</option>;
          })}
      </select>

      {!!error && (
        <Typography style={{ color: "red" }}>{error.message}</Typography>
      )}
    </>
  );
};

export default {
  title: "useConnectWallet",
  component: Demo,
} as ComponentMeta<typeof Demo>;

export const Primary = () => <Demo />;
