import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactTable from 'react-table'
import numeral from 'numeral'
import fx from 'money'

import { format, convert } from 'utils/'
import { currencies, ArrowUp, ArrowDown } from 'utils/icons'

import './table.css'

const Container = styled.div``

const Symbol = styled.span`
  color: #888;
  margin-right: 5px;
`

const TableContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
`

const CenteredItem = styled.span`
  display: flex;
  align-items: center;
  flex: 1;
`

const Index = styled.span`
  width: 50px;
`
const Logo = styled.img`
  margin-right: 15px;
`

class Currencies extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  renderColumns = () => {
    return [{
      Header: 'CRYPTOCURRENCY',
      accessor: 'name', // String-based value accessors!
      Cell: props => {
        const imgSrc = `/assets/coins/${props.original.symbol.toLowerCase()}.svg`
        return (
          <CenteredItem className='number'>
            <Index>{++props.index}</Index> <Logo src={imgSrc} /> {props.value}
          </CenteredItem>
        )
      } // Custom cell components!
    }, {
      Header: 'PRICE',
      accessor: d => {
        let { currency } = this.props
        let currentPrice = convert(d['price_usd'], currency)
        const price = numeral(currentPrice).format('0,0.00')
        const CurrencySym = currencies[currency]
        return <CenteredItem><Symbol><CurrencySym /></Symbol> {price}</CenteredItem>
      },
      id: 'price_'
      // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'MARKET CAP',
      id: 'marketCap', // Required because our accessor is not a string
      accessor: d => {
        let { currency } = this.props
        let currentMarketCap = convert(d[`market_cap_usd`], currency)
        const marketCap = numeral(currentMarketCap).format('0,0')
        const CurrencySym = currencies[currency]
        return <CenteredItem><Symbol><CurrencySym /></Symbol> {marketCap}</CenteredItem>
      } // Custom value accessors!
    }, {
      Header: '24HR CHANGE',
      accessor: d => {
        let percentChange = numeral(d.percent_change_24h).format('0.00')
        let positive = percentChange >= 0
        let color = positive ? 'green' : 'red'
        return <CenteredItem style={{color}}>{percentChange} % <span style={{marginLeft: '10px'}}>{positive ? <ArrowUp /> : <ArrowDown /> }</span></CenteredItem>
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
      // console.log({rowInfo, column})
      return {
        style: { },
        onClick: evt => {
          console.log('Click row', ({evt}))
        }
      }
    }

    getTheadThProps = () =>
      (state, rowInfo, column) => {
        // console.log({rowInfo, column})
        return {
          style: { },
          onClick: evt => {
            console.log('Click getTheadThProps', ({evt}))
          }
        }
      }

  /**
    * Sets props for rows of table
   *
   * @memberof Currencies
   */
  getTrProps = (state, rowInfo, column) => {
    return {
      style: {
        padding: '15px',
        paddingLeft: '15%',
        borderBottom: '1px solid lightgrey'
      },
      onClick: evt => {
        let { id } = rowInfo.original
        let { history } = this.props

        console.log('Click row', ({rowInfo}))
        console.log(rowInfo.original)
        console.log(`/app/${id}`)

        history.push({
          pathname: `/app/${id}`
        })
      }
    }
  }

  render () {
    let { crypto } = this.props
    const data = Object.values(crypto)
    let fxReady = typeof fx !== 'undefined'
    let noData = Object.keys(crypto).length === 0 || !fxReady

    // console.log({fx})
    // console.log({type: typeof fx})
    // console.log({fxReady})

    return (
      <Container>
        <TableContainer>
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

const mapStateToProps = (state) => ({
  crypto: state.crypto,
  currency: state.display.currency
})

export default connect(mapStateToProps)(Currencies)
