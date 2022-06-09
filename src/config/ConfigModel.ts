export interface Token {
  accSymbol: string;
  evmSymbol: string;
  logo: string;
  ethTokenAddress: string;
  accTokenAddress: string;
  accDepositAddress: string;
}

export interface AccNetwork {
  node: string;
  keyBook: string;
  explorer: string;
}

export interface EVMNetwork {
  node: string;
  chainId: number;
  safeAddress: string;
  bridgeAddress: string;
  infuraKey: string;
  explorer: string;
}

export interface Config {
  appName: string;
  tab1Names: string [];
  tab2Names: string [];
  tab1Path: string,
  tab2Path: string;
  accNetwork: AccNetwork;
  evmNetwork: EVMNetwork;
  
  tokens: Token[];
}