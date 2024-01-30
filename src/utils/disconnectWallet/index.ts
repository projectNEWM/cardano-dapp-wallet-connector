import { storageKey } from "common";

const disconnectWallet = () => {
  const selectedWalletName = localStorage.getItem(storageKey);

  if (!selectedWalletName) return;

  localStorage.removeItem(storageKey);
  // dispatch event so hook can register changes
  window.dispatchEvent(new Event(storageKey));
};

export default disconnectWallet;
