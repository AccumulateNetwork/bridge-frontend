export interface Messages {
  feesNotReceived: string
}

export interface EVMNetwork {
  bridgeAddress: string
  explorer: string
}

export interface Config {
  appName: string
  tab1Names: string []
  tab2Names: string []
  tab1Path: string
  tab2Path: string
  evmNetwork: EVMNetwork
  messages: Messages,
  bridgeADI: string
}