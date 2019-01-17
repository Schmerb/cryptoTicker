import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import numeral from 'numeral'

import { updateCurrency } from 'actions/display'

import { format, convert } from 'utils/'
import { currencies, ArrowLeftCircle, CaretDown } from 'utils/icons'

import './index.css'

const Header = styled.header`
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  padding: 0 50px;
`

const Title = styled.h2``

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
  margin-right: 100px;
`

const Symbol = styled.span`
  color: #888;
  margin-right: 5px;
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
    let { dispatch } = this.props
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

    // console.log({id})
    // console.log({coinsById})
    // console.log({coin})

    let { symbol, name } = coin
    const price = convert(coin['price_usd'], currency)
    const imgSrc = `/assets/coins/${symbol.toLowerCase()}.svg`

    const currentPrice = numeral(price).format('0,0.00')
    const CurrencySym = currencies[currency]

    return (
      <DetailsBanner>
        <Link style={{marginRight: '25px'}} to='/app'>
          <ArrowLeftCircle style={{color: '#B9D3E7'}} />
        </Link>
        <NameWrap>
          <img style={{width: 'auto', height: '48px', marginRight: '20px'}} src={imgSrc} />
          <InnerWrap>
            <h2>{name}</h2>
            <h3>{symbol}</h3>
          </InnerWrap>
        </NameWrap>
        <PriceWrap>
          <span><Symbol><CurrencySym /></Symbol> {currentPrice}</span>
        </PriceWrap>
      </DetailsBanner>
    )
  }

  render () {
    // console.log({props: this.props})

    const Selector = () => (
      <form autoComplete='off'>
        <SelectWrapper className='custom-select-wrapper'>
          <Select
            className='custom-select'
            onChange={this.handleChange}
            value={this.props.currency}>
            <option value='USD'>USD</option>
            <option value='GBP'>GBP</option>
            <option value='EUR'>EUR</option>
            <option value='JPY'>JPY</option>
            <option value='KRW'>KRW</option>
          </Select>
          <CaretDown />
        </SelectWrapper>
      </form>
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
  return {
    coinsById,
    crypto: state.crypto,
    currency: state.display.currency
  }
}

export default withRouter(connect(mapStateToProps)(Banner))
