import {  Step } from "../card/steps"
// action types
import * as ACTION from './actions'
import { Fees } from "../common/Fees"
import { Token } from "../common/Token"


const {
  INITIAL,
  // use for back button
  INITIAL_WITH_DATA,
  TRANSFER_INSTRUCTIONS_STEP,
  SET_ACC_SYMBOL,
  SET_EVM_SYMBOL,
  SET_MINT_AMOUNT_AND_RECEIVED,
  GET_FEES,
  GET_TOKENS,
  SET_GLOBAL_NETWORK_ERROR
} = ACTION

export type StateType = {
  step: Step,
  accSymbol: string,
  evmSymbol: string,
  evmMintTxCost: string,
  url: string,
  evmAddress: string,
  mintAmount: number,
  mintReceived: number,
  fees: Fees,
  tokens: Token[],
  globalNetworkError: boolean
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
        evmSymbol: state.tokens.find(token => token.symbol === action.payload)!.evmSymbol,
        url: state.tokens.find(token => token.symbol === action.payload)!.url,
        evmAddress: state.tokens.find(token => token.symbol === action.payload)!.evmAddress,
        evmMintTxCost: state.tokens.find(token => token.symbol === action.payload)!.evmMintTxCost

      }
    case SET_EVM_SYMBOL:
      return {
        ...state,
        evmSymbol: action.payload,
        accSymbol: state.tokens.find(token => token.evmSymbol === action.payload)!.symbol,
        url: state.tokens.find(token => token.evmSymbol === action.payload)!.url,
        evmAddress: state.tokens.find(token => token.evmSymbol === action.payload)!.evmAddress
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
    case GET_TOKENS:
      return {
        ...state,
        tokens: action.payload,
        accSymbol: !state.accSymbol ? action.payload[0].symbol : state.accSymbol,
        evmSymbol: !state.evmSymbol ? action.payload[0].evmSymbol : state.evmSymbol,
        url: !state.url ? action.payload[0].url: state.url,
        evmAddress: !state.evmAddress ? action.payload[0].evmAddress: state.evmAddress,
        evmMintTxCost: !state.evmMintTxCost? action.payload[0].evmMintTxCost: state.evmMintTxCost

      }
    case SET_GLOBAL_NETWORK_ERROR:
      return {
        ...state,
        globalNetworkError: action.payload
      }
    default:
      return state
  }
}

export const initialState = {
  step: Step.INITIAL,
  accSymbol: "",
  evmSymbol: "",
  evmAddress: "",
  evmMintTxCost:"",
  url: "",
  mintAmount: 0,
  mintReceived: 0,
  fees: {  mintFee:0, burnFee: 0, evmFee: 0, received: null } as Fees,
  tokens: [],
  globalNetworkError: false
}