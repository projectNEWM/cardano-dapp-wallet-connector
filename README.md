# Cardano dApp Wallet Connector

The Cardano wallet dApp connector library provides components, hooks, and util functions to simplify
utilizing the Cardano wallet object as defined in [CIP 30](https://cips.cardano.org/cips/cip30).

<center>
  <table>
    <tr>
      <td>
        <img src="https://user-images.githubusercontent.com/5877597/234853247-dd2ec5b4-d90c-4a8a-8fa7-a35809b19e08.jpg">
      </td>
      <td>
        <img src="https://user-images.githubusercontent.com/5877597/234853263-50c79b44-beda-4b5c-81ab-c847f5768332.jpg">
      </td>
    </tr>
  </table>
</center>

### Example

The most straightforward implementation is to use the `ConnectWallet` component to connect a wallet
and the `useConnectWallet` hook to access it. This example will provide a button and modal to
connect a Cardano wallet. Once the wallet is connected, the `wallet` object and helper functions
from the hook can be utilized.

```
import { FunctionComponent, useEffect } from "react";
import { ConnectWallet, useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";

const Example: FunctionComponent = () => {
  const { wallet, getAddress } = useConnectWallet();
  const [address, setAddress] = useState<string>()

  useEffect(() => {
    if (wallet) {
      // do whatever you need with the wallet and/or helper functions once the wallet is connected
      // e.g. get an address from the wallet and update the component state with it
      getAddress(setAddress)
    }
  }, [wallet, getAddress])

  return (
    <ConnectWallet />
  );
};
```

## Components

### ConnectWallet

Provides a button, which brings up a modal to select and connect a wallet when clicked.

#### Props

- **`modalStyle?: CSSProperties`** Inline styles for the connect wallet modal.
- **`modalHeaderStyle?: CSSProperties`** Inline styles for the modal header.
- **`mainButtonStyle?: CSSProperties`** Inline styles for the button used to open the connect wallet modal.
- **`disconnectButtonStyle?: CSSProperties`** Inline styles for the modal disconnect button.
- **`fontFamily?: string`** Font family to be used throughout the component
- **`isInverted?: boolean`** `true` if text, icon, and hover styles should be adjusted for a dark background.
- **`onClickButton?: (event: MouseEvent) => void`** Called when intial button is clicked. Defaults opening the wallet modal.
- **`onCloseModal?: (event: MouseEvent) => void`** Called when modal close icon or background is clicked. Defaults to closing the wallet modal.
- **`onConnect?: (wallet: Wallet) => void`** Called when a wallet is connected.
- **`onError?: (message: string) => void`** Called when an error is received from the wallet.

### WalletButton

Stand-alone connect wallet button from the `ConnectWallet` component. It can be used if you
would like to create your own modal, or have it trigger functionality other than opening the
connect wallet modal.

#### Props

- **`onClick?: (event: MouseEvent) => void`** Called when the button is clicked.
- **`style?: CSSProperties`** Inline styles for the button.
- **`fontFamily?: string`** Font family for the button text.
- **`isInverted?: boolean`** `true` if text styles should be adjusted for a dark background.

### WalletModal

Stand-alone select wallet modal from the `ConnectWallet` component. It can be used if you would
like to trigger the modal with your own button or other user interaction.

#### Example

```
import { FunctionComponent, useState } from "react";
import { WalletModal, useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";

const Example: FunctionComponent = () => {
  const { wallet } = useConnectWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <MyCustomButton onClick={ () => setIsModalOpen(true) } />

      <WalletModal isOpen={isModalOpen} onClose={ () => setIsModalOpen(false) />
    </>
  );
};
```

#### Props

- **`isOpen: boolean`** `true` if the modal is open.
- **`onClose: (event: MouseEvent) => void`** Called when the modal background or close button is clicked.
- **`style?: CSSProperties`** Inline styles for the modal.
- **`headerStyle?: CSSProperties`** Inline styles for the modal header.
- **`disconnectButtonStyle?: CSSProperties`** Inline styles for the disconnect button.
- **`fontFamily?: string`** Font family for the button text.
- **`isInverted?: boolean`** `true` if text, icon, and hover styles should be adjusted for a dark background.
- **`onConnect?: (wallet: Wallet) => void`** Called when a wallet is connected.
- **`onError?: (message: string) => void`** Called when an error is received from the wallet.

## Hooks

### useConnectWallet

The `useConnectWallet` hook returns an object with the CIP 30 wallet object and
a number of helper functions.

#### Example

```
import { FunctionComponent, useEffect, useState } from "react";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";

const Example: FunctionComponent = () => {
  const { wallet, connect, getBalance, error } = useConnectWallet();
  const [walletBalance, setWalletBalance] = useState();

  useEffect(() => {
    connect("cip_30_wallet_identifier")
  }, []);

  useEffect(() => {
    if (wallet) {
      getBalance(setWalletBalance)
    }
  }, [wallet])

  if (!wallet) {
    return <div>No wallet connected.</div>;
  }

  return (
    <div>
      { wallet.name } wallet is currently connected.
      { !!walletBalance && <div>Current wallet balance is {walletBalance} ADA.</div> }
      { !!error && <div>An error occured: {error}</div> }
    </div>
  );
};
```

#### Returns

**`wallet: Wallet | undefined`**

The "Wallet" is an object as defined in [CIP 30](https://cips.cardano.org/cips/cip30).
If the wallet has not been connected yet, it will be undefined.

**`connect: (id: string) => undefined`**

Sets the `wallet` value for the provided wallet id.

**`disconnect: () => undefined`**

Disconnects the currently connected wallet and sets the `wallet` value to `undefined`.

**`isConnected: boolean`**

`true` if a wallet is connected.

**`getBalance: (callback: (balance: number) => undefined) => undefined`**

Function that accepts a callback with the current ADA balance as the argument.

**`getAddress: (callback: (address: string) => undefined) => undefined`**

Function that accepts a callback with a usable recieving address as the argument.

**`getChangeAddress: (callback: (address: string) => undefined) => undefined`**

Function that accepts a callback with a change address as the argument.

**`signTransaction: (tx: string, callback: (signedTx: string) => undefined) => undefined`**

Function that accepts an unsigned transaction and a callback with the signed
transaction as the argument.

**`isLoading: boolean`**

`true` if the wallet is currently loading (connecting, fetching balance, etc...).

**`error: string | undefined`**

An error message returned from the Cardano wallet, if one exists.

**`getSupportedWallets: () => Array<WalletInfo>`**

Returns an array of "WalletInfo" objects for Cardano wallet browser extensions.

The "WalletInfo" is an object with the following fields:

- `id: string` String identifier for the wallet
- `name: string` Display name for the wallet
- `icon: string` Path to the icon file
- `extensionUrl: string` Url for the wallet's browser extension
- `websiteUrl: string` Url for the wallet's website
- `isInstalled: boolean` `true` if the wallet browser extension has been installed

## Utils

In order to allow the library functionality to be used outside of a component, the following
functions can also be imported as utils:

**`disconnectWallet: () => void`**

Disconnects the currently connected wallet.

**`enableWallet: (walletId: string) => Promise<Wallet>`**

Connects the wallet corresponding to the provided wallet ID. Returns
a wallet object as defined in [CIP 30](https://cips.cardano.org/cips/cip30).

**`getWalletAddress: (wallet: Wallet) => Promise<string>`**

Returns a plain text wallet address from the provided wallet object.

**`getWalletChangeAddress: (wallet: Wallet) => Promise<string>`**

Returns a plain text wallet change address from the provided wallet object.

**`getWalletBalance: (wallet: Wallet) => Promise<number>`**

Returns the balance for the provided wallet in ADA.

**`signWalletTransaction: (wallet: Wallet, tx: string) => Promise<string>`**

Returns the full signed transaction as a CBOR encoded hex string.

**`getSupportedWallets: () => Array<WalletInfo>`**

Returns an array of "WalletInfo" objects for Cardano wallet browser extensions.

## Troubleshooting

### Issues with the jsdom testing library

If you're using the react-create-app package for your app (which `jsdom` is a dependency of), you
may encounter the following error when running jest: `ReferenceError: TextDecoder is not defined`.
This is because the `cbor-web` dependency references the `TextDecoder` global browser variable,
which is not present in the jsdom test environment. This can be resolved by adding the global
variable in your `setupTests.js` file:

```
import { TextDecoder } from "util";
global.TextDecoder = TextDecoder;
```

Another option is to mock the `@newm.io/cardano-dapp-wallet-connector` package for your tests:

```
jest.mock("@newm.io/cardano-dapp-wallet-connector", () => ({
  ...jest.requireActual,
  getWalletBalance: jest.fn(),
  useConnectWallet: jest.fn(() => ({
    wallet: {},
    connect: jest.fn(),
    disconnect: jest.fn(),
    isLoading: false,
    getAddress: jest.fn(),
    getBalance: jest.fn(),
    getSupportedWallets: jest.fn(),
  })),
}));
```

## Roadmap

- Improved customization
- Additional components
- Additional helper functions

Please let us know if you are a developer and would like to contribute to the package or if you
have an idea for additional functionality. Thanks!
