import { EnabledWallet } from "common";
import { encode, decode } from "cbor-web";

/**
 * Signs a transaction and returns the entire transaction as a CBOR encoded hex string.
 *
 * @param wallet the enabled wallet API
 * @param tx cbor hex encoded transaction string
 * @returns the full signed transaction as a CBOR encoded hex string
 */
const signWalletTransaction = async (wallet: EnabledWallet | null, tx: string): Promise<string> => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }

  const witnesses = await wallet.signTx(tx);
  const decodedTx = decode(tx);
  const decodedWitnesses = decode(witnesses);
  // update transaction with signature
  decodedTx[1] = decodedWitnesses;
  const encodedTx = encode(decodedTx);

  return encodedTx.toString("hex");
};

export default signWalletTransaction;
