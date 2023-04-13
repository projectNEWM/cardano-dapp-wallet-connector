import { storageKey } from "common";
import React, { useCallback, useEffect, useReducer } from "react"
import { FunctionComponent } from "react";
import { enableWallet } from "utils";
import { StateContext, DispatchContext } from "./context";
import reducer, { initialState } from "./reducer";
import { ProviderProps } from "./types";

const Provider: FunctionComponent<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const setInitialWallet = useCallback(async () => {
    const initialWalletName = localStorage.getItem(storageKey)

    if (initialWalletName) {
      const enabledWallet = await enableWallet(initialWalletName)
      dispatch({ type: "setEnabledWallet", enabledWallet })
    }
  }, [])

  useEffect(() => {
    setInitialWallet();
  }, [])
    
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default Provider