import { storageKey } from "common";

const disconnectWallet = () => {
  const selectedWalletName = window.localStorage.getItem(storageKey);

  if (!selectedWalletName) return;

  window.localStorage.removeItem(storageKey);
};

export default disconnectWallet;
