// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import styled from 'styled-components'
// import numeral from 'numeral'

// const Item = styled.li`
//   list-style-type: none;
//   cursor: pointer;

//   a {
//     color: #222;
//   }

//   &:hover {
//     background-color: #dde2f9;
//   }
// `

// const CenteredItem = styled.li`
//   display: flex;
//   align-items: center;
// `

// const ListHeader = styled.ul`
//   display: flex;
//   justify-content: space-around;
//   list-style-type: none;
//   margin-top: 0;
//   padding: 25px 10%;
//   border-bottom: 1px solid rgba(0,0,0,0.2);

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `

// const Symbol = styled.span`
//   color: #aaa;
// `

// class CoinItem extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {

//     }
//   }

//   render () {
//     let { coin, index, currency } = this.props
//     let { id, symbol, price_usd, market_cap_usd, percent_change_24h: change24hr } = coin

//     currency = currency.toLowerCase()
//     let currentPrice = coin[`price_${currency}`]
//     let currentMarketCap = coin[`market_cap_${currency}`]

//     const price = numeral(currentPrice).format('0,0.00')
//     const marketCap = numeral(currentMarketCap).format('0,0')

//     let positive = change24hr >= 0
//     let color = positive ? 'green' : 'red'

//     const imgSrc = `/assets/coins/${symbol.toLowerCase()}.svg`
//     const arrowSrc = `/assets/icons/arrow-${positive ? 'up' : 'down'}.svg`
//     return (
//       <Item>
//         <Link to={`/app/${id}`}>
//           <ListHeader>

//             <CenteredItem>
//               <span style={{marginRight: '25px'}}>
//                 {++index}
//               </span>
//               <img src={imgSrc} />
//               {coin.name}
//             </CenteredItem>
//             <CenteredItem><Symbol>$</Symbol> {price}</CenteredItem>
//             <CenteredItem><Symbol>$</Symbol> {marketCap}</CenteredItem>
//             <CenteredItem style={{color}}>{change24hr}% <img style={{color, width: 'auto', height: '24px'}} src={arrowSrc} /></CenteredItem>
//           </ListHeader>
//         </Link>
//       </Item>
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   currency: state.display.currency
// })

// export default connect(mapStateToProps)(CoinItem)
