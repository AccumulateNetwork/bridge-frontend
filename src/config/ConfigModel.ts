export interface Token {
  symbol: string;
  logo: string;
  ethTokenAddress: string;
  ethDecimals: number;
  accTokenAddress: string;
  accDecimals: number;
  accDepositAddress: string;
  bridgeContract: string;
}

export interface Explorers {
  ethExplorer: string;
  accExplorer: string;
}

export interface EthNetwork {
  chainId: number;
  tokens: Token[];
  bridgeContract: string;
  explorers: Explorers;
}

export interface Config {
  appName: string;
  tab1Names: string [];
  tab2Names: string [];
  ethNetworks: EthNetwork[];
}