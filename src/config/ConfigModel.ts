export interface Token {
  accSymbol: string
  evmSymbol: string
  logo: string
  evmTokenAddress: string
  accTokenAddress: string
  accDepositAddress: string
}

export interface Messages {
  feesNotReceived: string
}

export interface AccNetwork {
  node: string
  keyBook: string
  explorer: string
}

export interface EVMNetwork {
  node: string
  chainId: number
  safeAddress: string
  bridgeAddress: string
  explorer: string
}

export interface Config {
  appName: string
  tab1Names: string []
  tab2Names: string []
  tab1Path: string
  tab2Path: string
  accNetwork: AccNetwork
  evmNetwork: EVMNetwork
  tokens: Token[]
  messages: Messages
}