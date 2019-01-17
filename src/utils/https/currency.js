import fx from 'money'

export function fetchExchangeRates () {
  let url = 'https://openexchangerates.org/api/latest.json?app_id=7e8707bf6e9c418382a1b62a54300582'
  fetch(url)
    .then(res => res.json())
    .then(res => {
      let { base, rates } = res
      let { USD, GBP, EUR, JPY, KRW } = rates
      console.log({USD, GBP, EUR, JPY, KRW})
      console.log({fx})

      if (typeof fx !== 'undefined' && fx.rates) {
        fx.rates = rates
        fx.base = base
      }
      // else {
      //   // If not, apply to fxSetup global:
      //   var fxSetup = {
      //     rates: rates,
      //     base: base
      //   }
      // }
    })
    .catch(err => console.error(err))
}
