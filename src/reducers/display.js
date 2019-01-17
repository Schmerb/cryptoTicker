import { UPDATE_CURRENCY } from 'actions/display'

const initialState = {
  currency: 'USD'
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENCY:
      return {
        ...state,
        currency: action.currency
      }
    default:
      return state
  }
}
