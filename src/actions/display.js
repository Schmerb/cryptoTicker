export const UPDATE_CURRENCY = 'UPDATE_CURRENCY'
export const updateCurrency = (currency) => ({
  type: UPDATE_CURRENCY,
  currency
})

export const UPDATE_DIMENSIONS = 'UPDATE_DIMENSIONS'
export const updateDimensions = ({width, height}) => ({
  type: UPDATE_DIMENSIONS,
  width,
  height
})

export const UPDATE_TIMESTAMP = 'UPDATE_TIMESTAMP'
export const updateTimestamp = (timestamp) => ({
  type: UPDATE_TIMESTAMP,
  timestamp
})

export const UPDATE_FETCHING = 'UPDATE_FETCHING'
export const updateFetching = (fetching) => ({
  type: UPDATE_FETCHING,
  fetching
})
