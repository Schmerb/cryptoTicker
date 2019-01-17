import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import numeral from 'numeral'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

import store from 'reducers/'
import { updateCurrency } from 'actions/display'
import { fetchCoins } from 'utils/https/crypto'

const Header = styled.header`
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  padding: 0 50px;
`

const Title = styled.h2`

`

const DetailsBanner = styled.div`
  display: flex;
  align-items: center;
`

const NameWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`
const InnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2, h3 {
    margin: 0;
    padding: 0;
  }
`

const PriceWrap = styled.div`
  font-size: 1.5rem;
  margin-left: 25px;
`

const Select = styled.select`
 
`

const SelectWrapper = styled.div`
  
`

class Banner extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount = () => {
    let { crypto } = this.props
    if (Object.keys(crypto).length === 0) {

    }
  }

  handleChange = (evt) => {
    let value = evt.target.value
    // console.log({value})
    let { dispatch } = this.props
    fetchCoins(store, 10, value)
    dispatch(updateCurrency(value))
  }

  renderTitle = () => <Title><Link to='/app'>VFCrypto</Link></Title>

  renderDetails = () => {
    let { location, coinsById, currency } = this.props
    let { pathname } = location

    if (Object.keys(coinsById).length === 0) {
      return <div />
    }

    let id = _.last(pathname.split('/'))

    let coin = coinsById[id]

    console.log({id})
    console.log({coinsById})
    console.log({coin})

    currency = currency.toLowerCase()
    let { symbol, name } = coin
    const price = coin[`price_${currency}`]
    const imgSrc = `/assets/coins/${symbol.toLowerCase()}.svg`

    const currentPrice = numeral(price).format('0,0.00')

    return (
      <DetailsBanner>
        <Link style={{marginRight: '25px'}} to='/app'><FontAwesomeIcon color={'#B9D3E7'} icon={faArrowCircleLeft} size='2x' /></Link>
        <NameWrap>
          <img style={{width: 'auto', height: '48px', marginRight: '20px'}} src={imgSrc} />
          <InnerWrap>
            <h2>{name}</h2>
            <h3>{symbol}</h3>
          </InnerWrap>
        </NameWrap>
        <PriceWrap>
          <span>$ {currentPrice}</span>
        </PriceWrap>
      </DetailsBanner>
    )
  }

  render () {
    let { match } = this.props

    console.log({props: this.props})

    const Selector = () => (
      <SelectWrapper>
        <Select onChange={this.handleChange}>
          <option value='USD'>USD</option>
          <option value='GBP'>GBP</option>
          <option value='EUR'>EUR</option>
          <option value='JPY'>JPY</option>
          <option value='KRW'>KRW</option>
        </Select>
      </SelectWrapper>
    )

    return (
      <Header role='banner'>
        <div>
          <Route exact path='/app' component={this.renderTitle} />
          <Route exact path='/app/:id' component={this.renderDetails} />
        </div>
        <Route path='/app' component={Selector} />
      </Header>
    )
  }
}

const mapStateToProps = (state) => {
  let { crypto } = state
  let coinsById = _.keyBy(crypto, 'id')
  console.log({coinsById})
  return {
    coinsById,
    crypto: state.crypto,
    currency: state.display.currency
  }
}

export default withRouter(connect(mapStateToProps)(Banner))
