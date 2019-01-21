import {
  UPDATE_CURRENCY,
  UPDATE_DIMENSIONS,
  UPDATE_TIMESTAMP,
  UPDATE_FETCHING
} from 'actions/display'

const initialState = {
  currency: 'USD',
  width: window.innerWidth,
  height: window.innerHeight,
  fetching: false
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
    case UPDATE_TIMESTAMP:
      return {
        ...state,
        timestamp: action.timestamp
      }
    case UPDATE_FETCHING:
      return {
        ...state,
        fetching: action.fetching
      }
    default:
      return state
  }
}
