import { EnabledWallet } from "common";
import { Buffer } from "buffer";
import { decode } from "cbor-web";

const getWalletTokenBalance = async (
  wallet: EnabledWallet | null,
  policyId: string,
  tokenName?: string,
) => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }

  const utxos = await wallet.getUtxos();

  const numTokens = utxos.reduce((sum: number, utxo: string) => {
    const decoded = decode(utxo);
    const quantity = decoded[1][1];

    // ignore ADA UTXOs
    if (typeof quantity === "number") return sum;

    const utxoMap: Map<Uint8Array, Map<Uint8Array, number>> = quantity[1];

    Array.from(utxoMap.entries()).forEach(([key, value]) => {
      const utxoPolicyId = Buffer.from(key).toString("hex");

      if (policyId !== utxoPolicyId) return;

      Array.from(value.entries()).forEach(([key, value]) => {
        const utxoTokenName = Buffer.from(key).toString("hex");

        if (tokenName && tokenName !== utxoTokenName) return;

        sum += value;
      });
    });

    return sum;
  }, 0);

  return numTokens / 1000000;
};

export default getWalletTokenBalance;
