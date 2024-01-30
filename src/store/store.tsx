import { State } from "./types";
import { makeObservable } from "./utils";
import { getInitialWalletName } from "utils/helpers";

export const initialState: State = {
  isLoading: false,
  error: null,
  enabledWallet: null,
  isConnected: !!getInitialWalletName(),
};

const store = makeObservable(initialState);

export default store;
