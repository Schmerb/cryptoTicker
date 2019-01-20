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
