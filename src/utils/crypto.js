import { API_ENDPOINT } from 'config'

import { updateCoinInfo } from 'actions/crypto'

export function fetchCoins (store, limit = 10) {
  let url = `${API_ENDPOINT}?limit=${limit}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log({res})
      console.log({store})
      store.dispatch(updateCoinInfo(res))
    })
    .catch(err => console.error(err))
}
