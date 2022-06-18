import React from "react"
import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { App } from "./App"
import BigNumber from "bignumber.js"

test("test convert decimals", () => {
  const pow = new BigNumber('10').pow(new BigNumber(8))
  const number = new BigNumber(5.123, 10)
  const result = number.multipliedBy(pow)
  expect(result.toNumber()).toEqual(512300000)
})
