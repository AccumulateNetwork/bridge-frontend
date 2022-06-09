import { Pages } from "../card/pages"
// action types
import * as ACTION from './actions';

const {
  CALCULATE_FEE_PAGE,
} = ACTION;

export type StateType = {
  page: Pages
};


export type ActionType = {
  type: string;
  payload?: any;
};

export type ReducerType<S, A> = (state: S, action: A) => S;

export const reducer: ReducerType<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    
    case CALCULATE_FEE_PAGE:
      return {
        ...state,
        page: Pages.CALCULATE_FEE
      }
    default:
      return state
  }
}

export const initialState = {
  page: Pages.SELECT_ASSET
}