export interface Token {
  accSymbol: string;
  evmSymbol: string;
  logo: string;
  ethTokenAddress: string;
  ethDecimals: number;
  accTokenAddress: string;
  accDecimals: number;
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
  accNetwork: AccNetwork;
  evmNetwork: EVMNetwork;
  tokens: Token[];
}