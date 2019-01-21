import _ from 'lodash'
import { API_ENDPOINT } from 'config'

import { updateCoinInfo } from 'actions/crypto'

export function fetchCoins (store, limit = 10) {
  let url = `${API_ENDPOINT}?limit=${limit}&convert=USD`

  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log({res})
      console.log({store})
      store.dispatch(updateCoinInfo(_.keyBy(res, 'id')))
    })
    .catch(err => console.error(err))
}
