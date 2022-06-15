import React, { useReducer } from 'react'

import { StateType, ActionType, initialState, reducer } from './reducer'

type ContextType = {
  dispatch: React.Dispatch<ActionType>
} & StateType

export const StoreContext = React.createContext<ContextType>({
  ...initialState,
  dispatch: () => null,
})

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ dispatch, ...state }}>
      {children}
    </StoreContext.Provider>
  )
}