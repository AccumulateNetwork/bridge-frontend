import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

const injected = new InjectedConnector({
  supportedChainIds: [1, 4]
})

const walletConnect = new WalletConnectConnector({
  rpc: { 1: 'https://testnet.infura.io/v3'},
  // infuraId: '6d3eacf08b4541fbb8d9708f769a5ddd',
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
})

export const connectors: any = {
  injected: injected,
  walletConnect: walletConnect
}