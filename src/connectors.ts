import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

const injected = new InjectedConnector({})

const walletConnect = new WalletConnectConnector({
  rpc: { 1: process.env.REACT_WALLET_CONNECT_URL ? process.env.REACT_WALLET_CONNECT_URL : '' },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
})

export const connectors: any = {
  injected: injected,
  walletConnect: walletConnect
}