export interface EVMNetwork {
  bridgeAddress: string
  explorer: string
}

export interface Config {
  appName: string
  tab1Name: string
  tab2Name: string
  tab1Path: string
  tab2Path: string
  evmNetwork: EVMNetwork
  bridgeADI: string
}