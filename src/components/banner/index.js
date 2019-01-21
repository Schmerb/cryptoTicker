import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import styled, { css } from 'styled-components'
import numeral from 'numeral'

import DetectOutsideClick from 'components/detectOutsideClick'

import { updateCurrency } from 'actions/display'

import { format, convert } from 'utils/'
import { smallDevice } from 'utils/styles'
import { superLightBlue, textGrey } from 'utils/colors'
import { currencies, ArrowLeft, ArrowLeftCircle, CaretDown } from 'utils/icons'

import './index.css'

let lightBlue = '#B9D3E7'

const Header = styled.header`
  color: #666;
  color: #989898;
  color: #7b848e;
  color: ${textGrey};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${props => props.small ? '100px' : '80px'};
  padding: ${props => props.small ? '10px' : '10px 50px'};
  z-index: 9999;
  transition: all 0.5s;
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

// const Select = styled.select``

const Symbol = styled.span`
  color: #888;
  margin-right: 5px;
`

const Form = styled.form`
  margin-right: 100px;
  cursor: pointer;
`

const SelectWrapper = styled.div`
  position: relative; 
`

const CustomSelect = styled.ul`
  position: absolute;
  list-style: none;
  transition: all 0.15s;
  opacity: 0;

  ${props =>
    props.visible
      ? css`
        opacity: 1;
        pointer-events: all;`
      : css`
        pointer-events: none;`
} 
`

const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
`

const CustomOpt = styled.li`
  display: flex;
  a {
    flex: 1;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

const Button = styled.button`
  background-color: transparent;
  color: inherit;
  font-size: 1rem;
  flex: 1;
  margin: 0;
  padding: 0;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 0;
  border: 0;
  cursor: pointer;
  transition: all 0.1s ease;
  text-align: left;
  outline: none; 

  &:hover {
    color: red;
  }
`

const Circle = styled.div`
  background-color: ${lightBlue};
  width: 35px;
  height: 35px;
  margin-right: 25px;
  border-radius: 50%;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const LogoImg = styled.img`
  width: auto; 
  height: 48px; 
  margin-right: 10px;
`

class Banner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      opacity: 0, // starting value
      visible: false // used to animate the custom select menu menu
    }
  }

  componentDidMount = () => {
    // this.setState({ opacity: 1 })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.noData !== this.props.noData) {
      this.setState({ opacity: 1 })
    }
  }

  handleClick = (evt) => {
    let { value } = evt.target.dataset
    let { dispatch } = this.props
    console.log({value})
    if (!value) return

    dispatch(updateCurrency(value))
  }

  handleShowOptions = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleMouseEnter = evt => {
    !this.state.visible && this.setState({ visible: true })
  }

  handleMouseLeave = evt => {
    this.state.visible && this.setState({ visible: false })
  }

  handleOutsideClick = (evt) => {
    if (this.state.visible) {
      this.handleMouseLeave(evt)
    }
  }

  renderTitle = () => <Title><Link to='/app'>VFCrypto</Link></Title>
  // renderTimestamp = () => <div>{timestamp}</div>

  renderDetails = () => {
    let { location, coinsById, currency, width } = this.props
    let { pathname } = location

    if (Object.keys(coinsById).length === 0) {
      return <div />
    }

    let id = _.last(pathname.split('/'))
    let coin = coinsById[id]

    let { symbol, name } = coin
    const price = convert(coin['price_usd'], currency)
    const imgSrc = `/assets/coins/${symbol.toLowerCase()}.svg`

    const currentPrice = numeral(price).format('0,0.00')
    const CurrencySym = currencies[currency]

    const small = width < smallDevice

    return (
      <DetailsBanner>
        <Circle>
          <Link to='/app'><ArrowLeft color={superLightBlue} size='1x' /></Link>
        </Circle>
        <NameWrap>
          <LogoImg src={imgSrc} />
          <InnerWrap>
            <h2>{name}</h2>
            <h3>{symbol}</h3>
          </InnerWrap>
        </NameWrap>
        <PriceWrap>
          <span><Symbol><CurrencySym /></Symbol> {currentPrice}</span>
          {small && this.renderCustomSelect()}
        </PriceWrap>
      </DetailsBanner>
    )
  }

  renderOpt = (currency) => {
    return (
      <CustomOpt key={currency} selected={currency === 'USD'}>
        <Button type='button' onClick={this.handleClick} data-value={currency}>{currency}</Button>
      </CustomOpt>
    )
  }

  renderCustomSelect = () => {
    let { visible } = this.state
    let { currency, width } = this.props
    let baseCurrencies = ['USD', 'GBP', 'EUR', 'JPY', 'KRW']
    return (
      <DetectOutsideClick handleClickAtChild={this.handleOutsideClick}>
        <Form autoComplete='off'>
          <SelectWrapper
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            className='custom-select-wrapper'>
            <InputWrapper
              onClick={this.handleShowOptions}>
              <label htmlFor='base-currency' style={{cursor: 'pointer'}}>
                <input type='hidden' value={currency} name='age' id='base-currency' />
                {currency}
              </label>
              <CaretDown />
            </InputWrapper>
            <CustomSelect
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              visible={visible}
              style={{opacity: visible ? 1 : 0}}
              className='custom-select-el'>
              {baseCurrencies.map(opt => this.renderOpt(opt))}
            </CustomSelect>
          </SelectWrapper>
        </Form>
      </DetectOutsideClick>
    )
  }

  render () {
    let { opacity } = this.state
    let { width, location, timestamp } = this.props
    let small = width < smallDevice
    console.log({opacity})
    console.log({small})
    let date = new Date(timestamp)
    let minutes = date.getMinutes()
    let hours = date.getHours()
    let month = date.getUTCMonth() + 1 // months from 1-12
    let day = date.getUTCDate()
    let year = date.getUTCFullYear()
    let lastUpdated = `${month}/${day}/${year}, ${hours}:${minutes}`
    return (
      <Header small={small} role='banner' style={{opacity}}>
        <div>
          <Route exact path='/app' component={this.renderTitle} />
          <Route exact path='/app/:id' component={this.renderDetails} />
          <div><em>Last updated: {lastUpdated}</em></div>
        </div>
        {/* <Route path='/app' component={this.renderCustomSelect} /> */}
        {(location.pathname === '/app' || !small) && this.renderCustomSelect()}
      </Header>
    )
  }
}

const mapStateToProps = (state) => {
  let { crypto, display } = state
  let { width, timestamp } = display
  // let coinsById = _.keyBy(crypto, 'id')
  let coinsById = crypto
  const noData = Object.keys(crypto).length === 0
  return {
    timestamp,
    width,
    noData,
    coinsById,
    crypto: state.crypto,
    currency: state.display.currency
  }
}

export default withRouter(connect(mapStateToProps)(Banner))
