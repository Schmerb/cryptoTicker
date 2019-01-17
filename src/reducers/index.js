import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import cryptoReducer from 'reducers/crypto'
import displayReducer from 'reducers/display'

import { fetchCoins } from 'utils/https/crypto'

const store = createStore(
  combineReducers({
    display: displayReducer,
    crypto: cryptoReducer
  }),
  applyMiddleware(thunk, logger)
)

// initial fetch
fetchCoins(store)

// re-fetch every minute
// setInterval(() => {
//   fetchCoins(store)
// }, 60000)

export default store
