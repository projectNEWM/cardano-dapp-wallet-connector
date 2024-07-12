import { EnabledWallet, SignTxOptions } from "common";
import { encode, decode } from "cbor-web";
import { mergeSignatureMaps } from "utils/helpers";

/**
 * Signs a transaction and returns the entire transaction as a CBOR encoded hex string.
 *
 * @param wallet the enabled wallet API
 * @param tx cbor hex encoded transaction string
 * @param options optional parameters for partial sign and debug transaction
 * @returns the full signed transaction as a CBOR encoded hex string
 */
const signWalletTransaction = async (
  wallet: EnabledWallet | null,
  tx: string,
  options?: SignTxOptions,
): Promise<string> => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }

  const { partialSign = false, createDebugTx = false } = options || {};

  const witnesses = await wallet.signTx(tx, partialSign, createDebugTx);
  const decodedTx = decode(tx);
  const decodedWitnesses = decode(witnesses);
  const existingSignatures = decodedTx[1];

  // update transaction with signature
  if (existingSignatures instanceof Map && existingSignatures.size > 0) {
    const mergedSignatures = mergeSignatureMaps(decodedWitnesses, existingSignatures);
    decodedTx[1] = mergedSignatures;
  } else {
    decodedTx[1] = decodedWitnesses;
  }

  return encode(decodedTx).toString("hex");
};

export default signWalletTransaction;
