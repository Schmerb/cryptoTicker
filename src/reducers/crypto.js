import { UPDATE_COIN_INFO } from 'actions/crypto'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case UPDATE_COIN_INFO:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}
