export interface EthNetwork {
  chainId: number;

  // hostname: string;
  // port: number | string;
}

export interface Config {
  ethNetworks: EthNetwork[]
}