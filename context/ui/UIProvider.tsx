import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false
}


export const UIProvider: FC = ({ children }) => {

  const [ state, dispatch ] = useReducer(uiReducer, UI_INITIAL_STATE)

  const openSideMenu = () => dispatch({ type: '[UI] - Open Sibebar' })

  const closeSideMenu = () => dispatch({ type: '[UI] - Close Sibebar' })

  const setIsAddingEntry = (isAdding: boolean) => dispatch({ type: '[UI] - Set isAddingEntry', payload: isAdding })

  const startDragging = () => dispatch({ type: '[UI] - Start Dragging' })

  const endDragging = () => dispatch({ type: '[UI] - End Dragging' })

  return (
    <UIContext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,
      startDragging,
      endDragging
    }}>
      {children}
    </UIContext.Provider>
  )

}