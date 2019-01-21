import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import numeral from 'numeral'

import { format, convert } from 'utils/'
import { currencies } from 'utils/icons'

const Item = styled.li`
 
  list-style-type: none;
  cursor: pointer;
  a {
    text-decoration: none;
    color: #222;
  }
  &:hover {
    background-color: #dde2f9;
  }
`

const CenteredItem = styled.li`
  display: flex;
  align-items: center;
`

const ListHeader = styled.ul`
  
  list-style-type: none;
  margin-top: 0;
  padding: 25px 10%;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  @media (min-width: 768px) {
    flex-direction: column;
  }
`

const Symbol = styled.span`
  color: #aaa;
`

export default class CoinItem extends Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render () {
    let { coin, index, currency } = this.props
    let { rank, id, symbol, price_usd, market_cap_usd, percent_change_24h: change24hr } = coin
    // console.log({ symbol, price_usd, market_cap_usd, change24hr })

    // const price = numeral(price_usd).format('0,0.00')
    // const marketCap = numeral(market_cap_usd).format('0,0')
    const imgSrc = `/assets/coins/${symbol.toLowerCase()}.svg`

    const positive = change24hr >= 0
    const arrowSrc = `/assets/icons/arrow-${positive ? 'up' : 'down'}.svg`
    const color = positive ? 'green' : 'red'

    // bet base currency symbol
    const CurrencySym = currencies[currency]

    // convert to base currency
    const currentPrice = convert(price_usd, currency)
    const currentCap = convert(market_cap_usd, currency)

    // format number
    const price = numeral(currentPrice).format('0,0.00')
    const marketCap = numeral(currentCap).format('0,0')

    return (
      <Item>
        <Link to={`/app/${id}`}>
          <ListHeader>

            <CenteredItem>{rank} <img src={imgSrc} /> {coin.name}</CenteredItem>
            <li><Symbol><CurrencySym /></Symbol> {price}</li>
            <li><Symbol><CurrencySym /></Symbol> {marketCap}</li>
            <CenteredItem style={{color}}>{change24hr}% <img style={{color, width: 'auto', height: '24px'}} src={arrowSrc} /></CenteredItem>
          </ListHeader>
        </Link>
      </Item>
    )
  }
}
