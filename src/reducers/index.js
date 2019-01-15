import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import cryptoReducer from 'reducers/crypto'
// import displayReducer from 'reducers/display'

import { fetchCoins } from 'utils/crypto'

const store = createStore(
  combineReducers({
    // display: displayReducer,
    crypto: cryptoReducer
  }),
  applyMiddleware(thunk, logger)
)

fetchCoins(store)

export default store
