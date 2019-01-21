import _ from 'lodash'
import { API_ENDPOINT } from 'config'

import { updateCoinInfo } from 'actions/crypto'
import { updateTimestamp, updateFetching } from 'actions/display'

export function fetchCoins (store, limit = 10) {
  let url = `${API_ENDPOINT}?limit=${limit}&convert=USD`
  store.dispatch(updateFetching(true))
  fetch(url)
    .then(res => res.json())
    .then(res => {
      // console.log({res})
      // console.log({store})
      let time = Date.now()
      // console.log({time})
      store.dispatch(updateFetching(false))
      store.dispatch(updateCoinInfo(_.keyBy(res, 'id')))
      store.dispatch(updateTimestamp(time))
    })
    .catch(err => console.error(err))
}
