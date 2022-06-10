import {  Step } from "../card/steps"
// action types
import * as ACTION from './actions'
import { config } from "../config/config"

const {
  SELECT_ASSET_STEP,
  CALCULATE_FEE_STEP,
  SET_SYMBOL
} = ACTION

export type StateType = {
  step: Step,
  accSymbol: string
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
    case SET_SYMBOL:
      return {
        ...state,
        accSymbol: action.payload
      }
    default:
      return state
  }
}

export const initialState = {
  step: Step.SELECT_ASSET,
  accSymbol: config.tokens[0].accSymbol
}