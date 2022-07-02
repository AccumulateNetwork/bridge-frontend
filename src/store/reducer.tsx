import {  Step } from "../card/steps"
// action types
import * as ACTION from './actions'
import { config } from "../config/config"
import { Fees } from "../common/Fees"

const {
  INITIAL,
  // use for back button
  INITIAL_WITH_DATA,
  TRANSFER_INSTRUCTIONS_STEP,
  SET_ACC_SYMBOL,
  SET_EVM_SYMBOL,
  SET_MINT_AMOUNT_AND_RECEIVED,
  GET_FEES
} = ACTION

export type StateType = {
  step: Step,
  accSymbol: string,
  evmSymbol: string,
  mintAmount: number,
  mintReceived: number,
  fees: Fees
}

export type ActionType = {
  type: string
  payload?: any
}

export type ReducerType<S, A> = (state: S, action: A) => S

export const reducer: ReducerType<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case INITIAL:
      return {
        ...initialState
      }
    case INITIAL_WITH_DATA:
      return {
        ...state,
        step: Step.INITIAL
      }
    case TRANSFER_INSTRUCTIONS_STEP:
      return {
        ...state,
        step: Step.TRANSFER_INSTRUCTIONS
      }
    case SET_ACC_SYMBOL:
      return {
        ...state,
        accSymbol: action.payload,
        evmSymbol: config.tokens.find(token => token.accSymbol === action.payload)!.evmSymbol
      }
    case SET_EVM_SYMBOL:
      return {
        ...state,
        accSymbol: config.tokens.find(token => token.evmSymbol === action.payload)!.accSymbol,
        evmSymbol: action.payload
      }
    case SET_MINT_AMOUNT_AND_RECEIVED:
      return {
        ...state,
        mintAmount: action.payload.mintAmount,
        mintReceived: action.payload.mintReceived
      }
    case GET_FEES:
      return {
        ...state,
        fees: action.payload
      }
    default:
      return state
  }
}

export const initialState = {
  step: Step.INITIAL,
  accSymbol: config.tokens[0].accSymbol,
  evmSymbol: config.tokens[0].evmSymbol,
  mintAmount: 0,
  mintReceived: 0,
  fees: {  mintFee:0, burnFee: 0, evmFee: 0, received: null } as Fees
}