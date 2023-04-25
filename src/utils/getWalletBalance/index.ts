import { EnabledWallet } from "common";
import { decode } from "cbor-web";

/**
 * @returns ADA balance for the wallet
 */
const getWalletBalance = async (wallet: EnabledWallet | null) => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }

  const balanceHex = await wallet.getBalance();

  const decoded = decode(balanceHex);
  const lovelaces = Array.isArray(decoded) ? decoded[0] : decoded;

  return lovelaces / 1000000;
};

export default getWalletBalance;
