import { UIState } from './';

type UIActionType =
  | { type: '[UI] - Open Sibebar' }
  | { type: '[UI] - Close Sibebar' }
  | { type: '[UI] - Set isAddingEntry', payload: boolean }
  | { type: '[UI] - Start Dragging' }
  | { type: '[UI] - End Dragging' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

  switch (action.type) {
    case '[UI] - Open Sibebar':
      return {
        ...state,
        sideMenuOpen: true
      }
    case '[UI] - Close Sibebar':
      return {
        ...state,
        sideMenuOpen: false
      }
    case '[UI] - Set isAddingEntry':
      return {
        ...state,
        isAddingEntry: action.payload
      }
    case '[UI] - Start Dragging':
      return {
        ...state,
        isDragging: true
      }
    case '[UI] - End Dragging':
      return {
        ...state,
        isDragging: false
      }
    default:
      return state
  }
}