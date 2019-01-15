import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import numeral from 'numeral'

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
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  margin-top: 0;
  padding: 25px 10%;
  border-bottom: 1px solid rgba(0,0,0,0.2);

  @media (max-width: 768px) {
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
    console.log({props: this.props})
    let { coin, index } = this.props
    let { symbol, price_usd, market_cap_usd, percent_change_24h: change24hr } = coin

    const price = numeral(price_usd).format('0,0.00')
    const marketCap = numeral(market_cap_usd).format('0,0')
    const imgSrc = `/assets/coins/${symbol.toLowerCase()}.svg`
    let positive = change24hr >= 0
    const arrowSrc = `/assets/icons/arrow-${positive ? 'up' : 'down'}.svg`
    let color = positive ? 'green' : 'red'
    return (
      <Item>
        <Link to={`/${symbol}`}>
          <ListHeader>

            <CenteredItem>{++index} <img src={imgSrc} /> {coin.name}</CenteredItem>
            <li><Symbol>$</Symbol> {price}</li>
            <li><Symbol>$</Symbol> {marketCap}</li>
            <CenteredItem style={{color}}>{change24hr}% <img style={{color, width: 'auto', height: '24px'}} src={arrowSrc} /></CenteredItem>
          </ListHeader>
        </Link>
      </Item>
    )
  }
}
