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
import { fetchExchangeRates } from 'utils/https/currency'

const store = createStore(
  combineReducers({
    display: displayReducer,
    crypto: cryptoReducer
  }),
  applyMiddleware(thunk, logger)
)

// initial fetch
fetchCoins(store)
fetchExchangeRates()

// re-fetch every minute
// setInterval(() => {
//   fetchCoins(store)
// }, 60000)

export default store
