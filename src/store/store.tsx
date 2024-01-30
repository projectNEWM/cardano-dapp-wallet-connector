import { storageKey } from "common";
import { State } from "./types";
import { makeObservable } from "./utils";

export const initialState: State = {
  isLoading: false,
  error: null,
  enabledWallet: null,
  isConnected: !!localStorage?.getItem(storageKey),
};

const store = makeObservable(initialState);

export default store;
