import { supportedWallets } from "common/constants"
import { SupportedWallets } from "common/types"

export const getInstalledWallets = () => {
  if (!window.cardano) return []
  
  return Object.keys(window.cardano).filter((walletName) =>
    Object.values(supportedWallets).includes(walletName as SupportedWallets)
  )
}