import BigNumber from "bignumber.js"
import { fetchJson } from "ethers/lib/utils"
import { Config } from '../src/config/ConfigModel'

test("test convert decimals", () => {
  const pow = new BigNumber('10').pow(new BigNumber(8))
  const number = new BigNumber(5.123, 10)
  const result = number.multipliedBy(pow)
  expect(result.toNumber()).toEqual(512300000)
})

test("test config from github", () => {
  const configUrl = process.env.REACT_APP_CONFIG_URL as string
  fetchJson(configUrl).then((result) => {
    const config = result as Config
    expect(config.appName).toEqual('Accumulate Bridge')
  })
})
