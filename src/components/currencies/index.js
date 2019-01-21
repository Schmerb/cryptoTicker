import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactTable from 'react-table'
import numeral from 'numeral'

import CoinItem from './coinItem'

import { convert } from 'utils/'
import { smallDevice } from 'utils/styles'
import { currencies, ArrowUp, ArrowDown } from 'utils/icons'

import './table.css'

const Container = styled.div``

const Symbol = styled.span`
  color: #aaa;
  margin-right: 5px;
`

const TableContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  transition: all 2s;
`

const CenteredItem = styled.span`
  display: flex;
  align-items: center;
  flex: 1;
`
const RightItem = styled.span`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`

const Index = styled.span``
const Logo = styled.img`
  margin-right: 15px;
`

const CoinList = styled.ul`
  padding: 0;
`

class Currencies extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  renderColumns = () => {
    let { width } = this.props
    let small = width < smallDevice
    return [{
      Header: 'CRYPTOCURRENCY',
      accessor: 'name', // String-based value accessors!
      Cell: props => {
        const imgSrc = `/assets/coins/${props.original.symbol.toLowerCase()}.svg`
        let { width } = this.props
        return (
          <CenteredItem className='number'>
            <Index style={{width: width < smallDevice ? '20px' : '50px'}}>{++props.index}</Index> <Logo src={imgSrc} /> {props.value}
          </CenteredItem>
        )
      } // Custom cell components!
    }, {
      Header: 'PRICE',
      accessor: d => {
        let { currency, width } = this.props
        let currentPrice = convert(d['price_usd'], currency)
        const price = numeral(currentPrice).format('0,0.00')
        const CurrencySym = currencies[currency]
        const justifyContent = width < smallDevice ? 'center' : 'flex-start'
        return <CenteredItem style={{justifyContent, fontSize: '1.1rem'}}><Symbol><CurrencySym size='sm' /></Symbol> {price}</CenteredItem>
      },
      id: 'price_'
      // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'MARKET CAP',
      id: 'marketCap', // Required because our accessor is not a string
      show: !small, /// hides column for smaller views
      accessor: d => {
        let { currency } = this.props
        let currentMarketCap = convert(d[`market_cap_usd`], currency)
        const marketCap = numeral(currentMarketCap).format('0,0')
        const CurrencySym = currencies[currency]
        let Item = this.props.width < smallDevice ? RightItem : CenteredItem
        return <Item style={{fontSize: '1.1rem'}}><Symbol><CurrencySym size='sm' /></Symbol> {marketCap}</Item>
      } // Custom value accessors!
    }, {
      Header: '24HR CHANGE',
      accessor: d => {
        let percentChange = numeral(d.percent_change_24h).format('0.00')
        let positive = percentChange >= 0
        let color = positive ? 'green' : 'red'
        let marginLeft = positive ? '5px' : '0' // accounts for negative symbol of negative/red items
        let Item = this.props.width < smallDevice ? RightItem : CenteredItem
        return <Item style={{color, marginLeft}}>{percentChange} % <span style={{marginLeft: '10px'}}>{positive ? <ArrowUp /> : <ArrowDown /> }</span></Item>
      },
      id: 'change24_'
    }]
  }

  /**
   * Sets props for header of table
   *
   * @memberof Currencies
   */
  getTheadProps = () =>
    (state, rowInfo, column) => {
      let { width } = this.props
      return {
        className: width < smallDevice ? 'no-padding ' : '',
        style: { },
        onClick: evt => {
          console.log('Click row', ({evt}))
        }
      }
    }

    getTheadThProps = () =>
      (state, rowInfo, column) => {
        let { width } = this.props
        return {
          style: width < smallDevice ? {paddingLeft: '0px'} : {},

          onClick: evt => {
            // console.log('Click getTheadThProps', ({evt}))
          }
        }
      }

  /**
    * Sets props for rows of table
   *
   * @memberof Currencies
   */
  getTrProps = (state, rowInfo, column) => {
    let { width } = this.props
    return {
      style: {
        padding: '15px',
        paddingLeft: width < smallDevice ? '0px' : '15%',
        borderBottom: '0.1px solid rgba(0,0,0,0.1)'
      },
      onClick: evt => {
        let { id } = rowInfo.original
        let { history } = this.props

        // console.log('Click row', ({rowInfo}))
        // console.log(rowInfo.original)
        // console.log(`/app/${id}`)

        history.push({
          pathname: `/app/${id}`
        })
      }
    }
  }

  renderOptions= () => {
    let { crypto, currency } = this.props
    let options = _.orderBy(crypto, 'rank')
    return (
      <CoinList>
        {_.map(options, opt => {
          console.log({opt})
          return <CoinItem coin={opt} key={opt.id} currency={currency} />
        })}
      </CoinList>
    )
  }

  render () {
    let { crypto, noData } = this.props
    const data = Object.values(crypto)

    return (
      <Container>
        <TableContainer style={{opacity: noData ? 0 : 1}}>
          <ReactTable
            loading={noData}
            defaultPageSize={10}
            showPagination={false}
            data={data}
            columns={this.renderColumns()}
            getTdProps={this.getTdProps}
            getTheadProps={this.getTheadProps}
            getTheadThProps={this.getTheadThProps}
            getTrProps={this.getTrProps}
          />
        </TableContainer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  let { crypto, display } = state
  let { currency, width } = display
  const noData = Object.keys(crypto).length === 0
  return {
    width,
    noData,
    crypto,
    currency
  }
}

export default connect(mapStateToProps)(Currencies)
