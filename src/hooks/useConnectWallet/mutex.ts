import { Mutex } from "async-mutex";

export const selectWalletMutex = new Mutex();

export const getEnabledWalletMutex = new Mutex();

export const getAddressMutex = new Mutex();

export const getChangeAddressMutex = new Mutex();

export const getBalanceMutex = new Mutex();

export const signTransactionMutex = new Mutex();

export const getTokenBalanceMutex = new Mutex();
