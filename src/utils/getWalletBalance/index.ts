import { EnabledWallet } from "common";
import cbor from "cbor"

const getWalletBalance = async (wallet: EnabledWallet | null) => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }

  const balanceHex = await wallet.getBalance()
  const decoded = cbor.decode(balanceHex)
  const lovelaces = decoded[0]

  return lovelaces / 1000000
}

export default getWalletBalance