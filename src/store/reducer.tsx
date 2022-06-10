import { Pages } from "../card/pages"
// action types
import * as ACTION from './actions'
import { config } from "../config/config"


const {
  CALCULATE_FEE_PAGE,
  SET_SYMBOL
} = ACTION

export type StateType = {
  page: Pages,
  accSymbol: string
};

export type ActionType = {
  type: string
  payload?: any
};

export type ReducerType<S, A> = (state: S, action: A) => S;

export const reducer: ReducerType<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case CALCULATE_FEE_PAGE:
      return {
        ...state,
        page: Pages.CALCULATE_FEE
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
  page: Pages.SELECT_ASSET,
  accSymbol: config.tokens[0].accSymbol
}