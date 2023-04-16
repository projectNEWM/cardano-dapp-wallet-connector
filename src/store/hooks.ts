import { useEffect, useState } from "react";
import { State } from "./types";
import store from "./store";

export const useStore = () => {
  const [internalState, setInternalState] = useState(store.get());

  const setState = (newState: State) => {
    store.set(newState);
  };

  useEffect(() => {
    return store.subscribe(setInternalState);
  }, []);

  return {
    state: internalState,
    setState,
  };
};
