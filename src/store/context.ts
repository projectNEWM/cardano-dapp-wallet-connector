import { createContext, Dispatch } from "react";
import { initialState } from "./reducer";
import { Action, State } from "./types";

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);