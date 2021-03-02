import { createContext, useReducer } from 'react'
export const TitleContext = createContext({})
export const HeaderTitles = props => {
  return (
    <TitleContext.Provider value={{title: 'Hhhh'}}>
      {props.children}
    </TitleContext.Provider>
  )
}
const reducer = (state, action) => {
  switch(action.type){
    case 1:
      return
    default:
      return state
  }
}