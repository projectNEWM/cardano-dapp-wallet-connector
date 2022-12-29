# Cardano dApp Wallet Connector

The Cardano wallet dApp connector library simplifies functionality around
utilizing the Cardano wallet object as defined in [CIP 30](https://cips.cardano.org/cips/cip30).

## Hooks

### useConnectWallet

The `useConnectWallet` hook returns an object with the CIP 30 wallet object and
a number of helper functions.

#### Example

```
import { setState, FunctionComponent } from "react"
import { useConnectWallet } from "cardano-dapp-wallet-connector"

const Component: FunctionComponent = () => {
  const {
    wallet,
    connect,
    disconnect,
    getInstalledWallets,
    getAvailableWallets,
    getBalance,
    getAddress,
  } = useConnectWallet()

  const [balance, setBalance] = useState()
  const [address, setAddress] = useState()

  const installedWallets = getInstalledWallets()
  const availableWallets = getAvailableWallets()

  // provide access to the wallet and helper functions if a wallet is currently connected
  if (wallet) {
    return (
      <div>
        <div>{ wallet.name }</div>
        <div>Balance: {balance}</div>
        <div>Address: {address}</div>

        <button onPress={() => getBalance(setBalance)}>Get current balance</button>
        <button onPress={() => getAddress(setAddress)}>Get recieving address</button>
        <button onPress={() => disconnect()}>Disconnect wallet</button>
      </div>
    )
  }

  // if no wallet is connected, list currently installed wallets that can be connected
  if (installedWallets.length > 0) {
    return installedWallets.map(({ id, name }) => (
      <button onPress={() => connect(id)}>{ name }</button>
    ))
  }

  // if no wallets are installed, link to urls for available wallet extensions
  if (availableWallets.length > 0) {
    return (
      <div>
        Install one of the following wallets:

        <ul>
          {availableWallets.map(({ name, extensionUrl }) => (
            <li>
              <a rel="nofollow" target="_blank" href={ extensionUrl }>{ name }</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // if no available wallets, user is not using a browser that supports Cardano wallet extensions
  return (
    <div>
      Cardano wallets are currently only supported in Chrome and Brave browsers.
    </div>
  )
}
```

**`wallet`**

The wallet object as defined in [CIP 30](https://cips.cardano.org/cips/cip30).
If the wallet has not been connected yet, it will be undefined.

**`connect: (walletName: string) => undefined`**

Sets the `wallet` value to the CIP 30 wallet interface.

**`disconnect: () => undefined`**

Disconnects the currently connected wallet and sets the `wallet` value to
`undefined`.

**`getInstalledWallets: () => Array<InstalledWallet>`**

Returns an array of "InstalledWallet" objects for wallet browser extensions
that are currently installed and can be connected.

The "InstalledWallet" is an object with the following fields:

- `id: string` The string identifier for the wallet
- `name: string` The readable string name for the wallet

**`getAvailableWallets: () => Array<AvailableWallet>`**

Returns an array of "AvailableWallet" objects for wallet browser extensions
that can be installed.

The "AvailableWallet" is an object with the following fields:

- `name: string` The readable name for the wallet
- `logo: string` A source url for the wallet image
- `extenstionUrl: string` The url for the wallet extension
- `websiteUrl: string` The url for the wallet extension website

**`getBalance: (callback: (balance: number) => undefined) => undefined`**

Function that accepts a callback with the current ADA balance as
the argument.

**`getAddress: (callback: (address: string) => undefined) => undefined`**

Function that accepts a callback with a usable recieving address as
the argument.

**`isLoading: boolean`**

`true` if the wallet is currently loading (connecting, fetching balance, etc...).

**`error: string`**

An error message returned from the Cardano wallet, if one exists.

## Components

_in progress_

## Utils

_in progress_

## Roadmap

- Create transaction
- Additional components

Please let us know if you are a developer and would like to contribute to the
package or if you have an idea for additional functionality. Thanks!
