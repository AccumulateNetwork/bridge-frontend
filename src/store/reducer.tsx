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
  UPDATE_MINT_DESTINATION_ADDRESS,
  GET_FEES,
  GET_TOKENS,
  SET_GLOBAL_NETWORK_ERROR,
  SET_GLOBAL_SERVER_NOT_RESPONDED
} = ACTION

export type StateType = {
  step: Step,
  accSymbol: string,
  precision: number,
  evmSymbol: string,
  evmDecimals: number,
  evmMintTxCost: string,
  url: string,
  evmAddress: string,
  mintAmount: number,
  mintReceived: number,
  mintDestinationAddress: string,
  fees: Fees,
  tokens: Token[],
  tokensChainId: number,
  globalNetworkError: boolean
  globalServerNotResponded: boolean
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
        precision: state.tokens.find(token => token.symbol === action.payload)!.precision,
        evmSymbol: state.tokens.find(token => token.symbol === action.payload)!.evmSymbol,
        evmDecimals: state.tokens.find(token => token.symbol === action.payload)!.evmDecimals,
        url: state.tokens.find(token => token.symbol === action.payload)!.url,
        evmAddress: state.tokens.find(token => token.symbol === action.payload)!.evmAddress,
        evmMintTxCost: state.tokens.find(token => token.symbol === action.payload)!.evmMintTxCost,
        mintAmount: 0,
        mintReceived: 0
      }
    case SET_EVM_SYMBOL:
      return {
        ...state,
        evmSymbol: action.payload,
        accSymbol: state.tokens.find(token => token.evmSymbol === action.payload)!.symbol,
        precision: state.tokens.find(token => token.evmSymbol === action.payload)!.precision,
        evmDecimals: state.tokens.find(token => token.evmSymbol === action.payload)!.evmDecimals,
        url: state.tokens.find(token => token.evmSymbol === action.payload)!.url,
        evmAddress: state.tokens.find(token => token.evmSymbol === action.payload)!.evmAddress
      }
    case SET_MINT_AMOUNT_AND_RECEIVED:
      return {
        ...state,
        mintAmount: action.payload.mintAmount,
        mintReceived: action.payload.mintReceived
      }
    case UPDATE_MINT_DESTINATION_ADDRESS:
      return {
        ...state,
        mintDestinationAddress: action.payload
      }
    case GET_FEES:
      return {
        ...state,
        fees: action.payload
      }
    case GET_TOKENS:
      return {
        ...state,
        tokens: action.payload.items,
        tokensChainId: action.payload.chainId,
        accSymbol: !state.accSymbol ? action.payload.items[0].symbol : state.accSymbol,
        precision: state.precision === 0 ? action.payload.items[0].precision: state.precision,
        evmSymbol: !state.evmSymbol ? action.payload.items[0].evmSymbol : state.evmSymbol,
        evmDecimals: state.evmDecimals === 0 ? action.payload.items[0].evmDecimals : state.evmDecimals,
        url: !state.url ? action.payload.items[0].url: state.url,
        evmAddress: !state.evmAddress ? action.payload.items[0].evmAddress: state.evmAddress,
        evmMintTxCost: !state.evmMintTxCost? action.payload.items[0].evmMintTxCost: state.evmMintTxCost,
      }
    case SET_GLOBAL_NETWORK_ERROR:
      return {
        ...state,
        globalNetworkError: action.payload
      }
    case SET_GLOBAL_SERVER_NOT_RESPONDED:
      return {
        ...state,
        globalServerNotResponded: action.payload
      }
    default:
      return state
  }
}

export const initialState = {
  step: Step.INITIAL,
  accSymbol: "",
  precision: 0,
  evmSymbol: "",
  evmDecimals: 0,
  evmAddress: "",
  evmMintTxCost:"",
  url: "",
  mintAmount: 0,
  mintReceived: 0,
  mintDestinationAddress: "",
  fees: {  mintFee:0, burnFee: 0, evmFee: 0, received: null } as Fees,
  tokens: [],
  tokensChainId: 0,
  globalNetworkError: false,
  globalServerNotResponded: false
}