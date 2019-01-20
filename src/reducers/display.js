import { UPDATE_CURRENCY, UPDATE_DIMENSIONS } from 'actions/display'

const initialState = {
  currency: 'USD',
  width: window.innerWidth,
  height: window.innerHeight
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENCY:
      return {
        ...state,
        currency: action.currency
      }
    case UPDATE_DIMENSIONS:
      return {
        ...state,
        width: action.width,
        height: action.height
      }
    default:
      return state
  }
}
