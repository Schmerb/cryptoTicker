import { API_ENDPOINT } from 'config'

import { updateCoinInfo } from 'actions/crypto'

export function fetchCoins (store, limit = 10, customCurrency) {
  let currency
  if (!customCurrency) {
    currency = store.getState().display.currency
  } else {
    currency = customCurrency
  }
  console.log({currency})
  let url = `${API_ENDPOINT}?limit=${limit}&convert=${currency}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log({res})
      console.log({store})
      store.dispatch(updateCoinInfo(res))
    })
    .catch(err => console.error(err))
}
