import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import CoinItem from './coinItem'

const Container = styled.div``
const ListHeader = styled.ul`
  background-color: #dde2f9;
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  padding: 10px 10%;
  border-top: 1px solid rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const CoinsList = styled.ul`
  padding: 0;
  margin: 0;
`

class Currencies extends Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  renderCoins = () => {
    let { crypto } = this.props
    if (Object.keys(crypto) === 0) return

    return _.map(crypto, (coin, key) => {
      return <CoinItem coin={coin} key={coin.id} index={key} />
    })
  }

  render () {
    return (
      <Container>
        <ListHeader>
          <li>CRYPTOCURRENCY</li>
          <li>PRICE</li>
          <li>MARKET CAP</li>
          <li>24HR CHANGE</li>
        </ListHeader>
        <CoinsList>
          {/* <li>BTC</li>
          <li>ETH</li>
          <li>XRP</li> */}
          {this.renderCoins()}
        </CoinsList>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  crypto: state.crypto
})

export default connect(mapStateToProps)(Currencies)
