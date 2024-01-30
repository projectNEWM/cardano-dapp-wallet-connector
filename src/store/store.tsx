import { storageKey } from "common";
import { State } from "./types";
import { makeObservable } from "./utils";

const getIsConnected = () => {
  if (typeof localStorage !== "undefined") {
    return !!localStorage.getItem(storageKey);
  }

  return false;
};

export const initialState: State = {
  isLoading: false,
  error: null,
  enabledWallet: null,
  isConnected: getIsConnected(),
};

const store = makeObservable(initialState);

export default store;
