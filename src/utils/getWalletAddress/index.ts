import { EnabledWallet } from "common";
import { addressFromHex } from "utils/helpers";

/**
 * @returns a payment address for the wallet
 */
const getWalletAddress = async (
  wallet: EnabledWallet | null,
): Promise<string> => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }

  const addresses = await wallet.getUsedAddresses();
  const address = addresses[0];

  if (!address) {
    throw new Error("Unable to fetch wallet address");
  }

  return addressFromHex(address);
};

export default getWalletAddress;
