import { storageKey } from "common";

const disconnectWallet = () => {
  const selectedWalletName = window.localStorage.getItem(storageKey);

  if (!selectedWalletName) return;

  window.localStorage.removeItem(storageKey);
  // dispatch event so hook can register changes
  window.dispatchEvent(new Event(storageKey));
};

export default disconnectWallet;
