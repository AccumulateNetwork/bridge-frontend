import BigNumber from "bignumber.js";

export const truncateAddress = (address: string) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
}
  
export const toHex = (num: any) => {
  const val = Number(num);
  return "0x" + val.toString(16);
}

export function web3BNToFloatString(
  bn: number,
  divideBy: BigNumber,
  decimals: number,
  roundingMode = BigNumber.ROUND_DOWN
): string {
  const converted = new BigNumber(bn.toString())
  const divided = converted.div(divideBy)
  return divided.toFixed(decimals, roundingMode)
}
  