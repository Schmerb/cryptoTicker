import { UPDATE_EXCHANGE_RATES } from 'actions/crypto'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case UPDATE_EXCHANGE_RATES:
      return {
        ...state,
        ...action.rates
      }
    default:
      return state
  }
}
