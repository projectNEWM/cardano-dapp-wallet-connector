import { EnabledWallet } from "common";
import { addressFromHex } from "utils/helpers";

/**
 * @returns a payment address for the wallet
 */
export const getWalletAddress = async (
  wallet: EnabledWallet | null
): Promise<string> => {
  if (!wallet) {
    throw new Error("No wallet selected")
  }

  let addresses = [];

  // prefer used address, but get unused address as a back-up
  addresses = await wallet.getUsedAddresses();
  if (addresses.length === 0) {
    addresses = await wallet.getUnusedAddresses();
  }

  const address = addresses[0];

  if (!address) {
    throw new Error("Unable to fetch wallet address");
  }

  return addressFromHex(address);
};