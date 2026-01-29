import { createConfig, http } from 'wagmi'
import { localhost } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// 配置支持的链
const chains = [localhost] as const

// 创建 wagmi 配置
export const wagmiConfig = createConfig({
  chains,
  connectors: [
    // 注入式钱包（如浏览器扩展版 MetaMask / Rabby 等）
    injected(),
    // 如需 WalletConnect，配置有效的 projectId
    // walletConnect({
    //   projectId: 'YOUR_PROJECT_ID',
    // }),
  ],
  transports: {
    // [mainnet.id]: http(),
    // [sepolia.id]: http(),
    [localhost.id]: http('http://127.0.0.1:8545'), // 本地 Anvil 节点
  },
})
