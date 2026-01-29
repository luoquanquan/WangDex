import addresses from './addresses.json'
import wangTokenAbi from './abis/WangToken.json'
import wangDexAbi from './abis/WangDex.json'

type AddressJson = {
  WangDex?: `0x${string}`
  WangToken?: `0x${string}`
}

const typed = addresses as AddressJson

export const WANGDEX_ADDRESS = typed.WangDex as `0x${string}`
export const WANGTOKEN_ADDRESS = typed.WangToken as `0x${string}`
export const WANGTOKEN_ABI = wangTokenAbi
export const WANGDEX_ABI = wangDexAbi
export const NATIVE_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000" as `0x${string}`
