import numeral from 'numeral'
import fx from 'money'

export const format = num => numeral(num).format('0,0')
export const convert = (amount, currency) => fx.convert(amount, {from: 'USD', to: currency})
