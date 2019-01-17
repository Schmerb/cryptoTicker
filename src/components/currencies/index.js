import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactTable from 'react-table'
import numeral from 'numeral'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

// import CoinItem from './coinItem'

import './table.css'

const ArrowUp = (style) => <FontAwesomeIcon style={style} icon={faArrowUp} size='xs' />
const ArrowDown = (style) => <FontAwesomeIcon style={style} icon={faArrowDown} size='xs' />

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

// const FontAwe = <FontAwesomeIcon icon={faCoffee} />

class Currencies extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currency: props.currency
    }
  }

  renderColumns = () => {
    return [{
      Header: 'CRYPTOCURRENCY',
      accessor: 'name', // String-based value accessors!
      Cell: props => {
        // console.log({props})
        const imgSrc = `/assets/coins/${props.original.symbol.toLowerCase()}.svg`
        let num = props.index + 1
        // console.log({num})

        return (
          <CenteredItem className='number'>
            <Index>{++props.index}</Index> <Logo src={imgSrc} /> {props.value}
          </CenteredItem>
        )
      } // Custom cell components!
    }, {
      Header: 'PRICE',
      accessor: d => {
        let { currency } = this.state
        let currentPrice = d[`price_${currency.toLowerCase()}`]
        const price = numeral(currentPrice).format('0,0.00')
        return <CenteredItem><Symbol>$</Symbol> {price}</CenteredItem>
      },
      id: 'price_'
      // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'MARKET CAP',
      id: 'marketCap', // Required because our accessor is not a string
      accessor: d => {
        let { currency } = this.state
        let currentMarketCap = d[`market_cap_${currency.toLowerCase()}`]
        const marketCap = numeral(currentMarketCap).format('0,0')
        return <CenteredItem><Symbol>$</Symbol> {marketCap}</CenteredItem>
      } // Custom value accessors!
    }, {
      Header: '24HR CHANGE',
      accessor: d => {
        // console.log({d})
        let percentChange = numeral(d.percent_change_24h).format('0.00')
        let positive = percentChange >= 0
        let color = positive ? 'green' : 'red'
        // const arrowSrc = `/assets/icons/arrow-${positive ? 'up' : 'down'}.svg`
        // return <FontAwesomeIcon icon={'faCoffee'} />
        // return <span style={{color}}>{percentChange} % <FontAwe /></span>

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
    // console.log('\n\n\ngetTrProps\n\n\n')
    // console.log({state, rowInfo, column})
    return {
      style: {
        padding: '15px',
        paddingLeft: '15%',
        borderBottom: '1px solid lightgrey'
      },
      onClick: evt => {
        console.log('Click row', ({rowInfo}))
        console.log(rowInfo.original)
        let { currency } = this.props
        let { rank, id, symbol, name, [`price_${currency.toLowerCase()}`]: price } = rowInfo.original
        let { history } = this.props

        console.log({id, symbol, name, price})
        console.log(`/app/${id}`)

        history.push({
          pathname: `/app/${id}`,
          state: { symbol, name, price, rank }
        })
      }
    }
  }

  // renderCoins = () => {
  //   let { crypto } = this.props
  //   if (Object.keys(crypto) === 0) return

  //   return _.map(crypto, (coin, key) => {
  //     return <CoinItem coin={coin} key={coin.id} index={key} />
  //   })
  // }

  render () {
    const data = Object.values(this.props.crypto)
    // console.log({data})
    return (
      <Container>
        <TableContainer>
          <ReactTable
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
