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

// fetch exchange rates FIRST to avoid
// race case between money.js(fx) and React-Table
// need the fx() library loaded before data can be
// converted/displayed
fetchExchangeRates()
  .then(() => {
    // initial fetch
    fetchCoins(store)

    // re-fetch every minute
    // setInterval(() => {
    //   fetchCoins(store)
    // }, 60000)
  })

export default store
