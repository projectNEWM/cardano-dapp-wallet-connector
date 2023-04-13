import { Action, State } from "./types";

export const initialState: State = {
  isLoading: false,
  error: null,
  enabledWallet: null,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setIsLoading": {
      return {
        ...state,
        isLoading: action.isLoading,
      }
    }
    case "setError": {
      return {
        ...state,
        error: action.error,
      }
    }
    case "setEnabledWallet": {
      return {
        ...state,
        enabledWallet: action.enabledWallet,
      }
    }
    default: {
      throw new Error("Unknown action type")
    }
  }
}

export default reducer