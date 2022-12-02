import { EnabledWallet } from "common";
import { decode } from "cbor"

/**
 * @returns ADA wallet balance for the wallet
 */
const getWalletBalance = async (wallet: EnabledWallet | null) => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }

  const balanceHex = await wallet.getBalance()
  const decoded = decode(balanceHex)
  const lovelaces = decoded[0]

  return lovelaces / 1000000
}

export default getWalletBalance