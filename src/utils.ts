import BigNumber from "bignumber.js"

export const truncateAddress = (address: string | null| undefined) => {
    if (!address) return "No Account"
    const match = address.match(
      /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    )
    if (!match) return address
    return `${match[1]}…${match[2]}`
}

export const validETHAddress = (address: string) => {
  if (!address) {return false}
  const match = address.match( /^0x[a-fA-F0-9]{40}$/)
  return match
}

export const formAddress = (address: string | null| undefined) => {
  if (!address) return ""
  return address
}
  
export const toHex = (num: any) => {
  const val = Number(num)
  return "0x" + val.toString(16)
}

export const web3BNToFloatNumber = (
  bn: number,
  divideBy: BigNumber,
  decimals: number,
  roundingMode = BigNumber.ROUND_DOWN) => {
    const converted = new BigNumber(bn.toString())
    const divided = converted.div(divideBy)
    return Number(divided.toFixed(decimals, roundingMode))
  }

export const toETHNumber = (bn: number, decimals: number) => {
  const pow = new BigNumber('10').pow(new BigNumber(decimals))
  const number = new BigNumber(bn, 10)
  const result = number.multipliedBy(pow)
  return result.toNumber()
}
  