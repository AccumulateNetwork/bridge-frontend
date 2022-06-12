import {  Step } from "../card/steps"
// action types
import * as ACTION from './actions'
import { config } from "../config/config"

const {
  SELECT_ASSET_STEP,
  CALCULATE_FEE_STEP,
  TRANSFER_INSTRUCTIONS_STEP,
  SET_ACC_SYMBOL,
  SET_SEND_AND_RECEIVING,
  SET_RECEIVING
} = ACTION

export type StateType = {
  step: Step,
  accSymbol: string,
  evmSymbol: string,
  send: string,
  receiving: string
};

export type ActionType = {
  type: string
  payload?: any
};

export type ReducerType<S, A> = (state: S, action: A) => S;

export const reducer: ReducerType<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case SELECT_ASSET_STEP:
      return {
        ...initialState
      }
    case CALCULATE_FEE_STEP:
      return {
        ...state,
        step: Step.CALCULATE_FEE
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
        evmSymbol: config.tokens.filter(token => token.accSymbol === action.payload)[0].evmSymbol
      } 
    case SET_SEND_AND_RECEIVING:
      return {
        ...state,
        send: action.payload.send,
        receiving: action.payload.receiving
      }
    case SET_RECEIVING:
      return {
        ...state,
        receiving: action.payload
      }
    default:
      return state
  }
}

export const initialState = {
  step: Step.SELECT_ASSET,
  accSymbol: config.tokens[0].accSymbol,
  evmSymbol: config.tokens[0].evmSymbol,
  send: "",
  receiving: ""
}