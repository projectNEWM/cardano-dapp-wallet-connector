import { WalletInfo } from "common";

export interface GetSupportedWalletOptions {
  readonly omit?: ReadonlyArray<WalletInfo["id"]>;
}
