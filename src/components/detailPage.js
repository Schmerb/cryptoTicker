import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import numeral from 'numeral'
import fx from 'money'

import { format, convert } from 'utils/'
import { currencies } from 'utils/icons'
import { textBlue, green, darkBlue, lighterBlue, superLightBlue } from 'utils/colors'

// let superLightBlue = '#417bca'
// let circleBlue = '#1A3353'
// let textBlue = '#798dbf'
// let green = '#34d28a'

const Container = styled.div`
  display: flex;
  align-items: flexx-start;
  color: ${textBlue};
  height: 100%;
  background: #141E30;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, ${lighterBlue}, ${darkBlue});  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, ${lighterBlue}, ${darkBlue}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  

  h2, h3 {
    margin: 0;
    padding: 0;
  }
`

const Information = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  min-height: 250px;
  max-height: 35%;
`

const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  `
// align-items: center;

const DataWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;

  label {
    font-size: 0.95rem;
    margin-bottom: 10px;
  }
`

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${superLightBlue};
  background-color: #1e385a;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const Flex = styled.div`
  display: flex;
  flex: 1;
`

const Rank = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 15%;
  left: 40%;
  transform: translateX(-50%);
`

const Num = styled.span`
  font-size: 1.4rem;
  color: #fff;
`

const Sym = styled.span`
  color: ${green};
  font-weight: bold;
  font-size: 0.7rem;
  margin-left: 8px;
`

const Symbol = styled.span`
  display: inline-block;
  color: ${textBlue};
  margin: 0;
  transform: translateY(-5px);
`

const CenterVertical = styled.span`
  display: flex;
  align-items: center;
`

class DetailPage extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount = () => {

  }

  render () {
    let { match, currency, coinsById } = this.props
    let { id } = match.params

    if (Object.keys(coinsById).length === 0) {
      return <Container />
    }

    let coin = coinsById[id]

    let {
      available_supply: availableSupply,
      symbol,
      rank,
      market_cap_usd,
      '24h_volume_usd': volume24hr
    } = coin

    // Circulating Supply = available_supply
    // Total Supply = max_supply/total_supply

    let totalSupply = coin['max_supply'] || coin['total_supply'] // fallback, some data has null for max_supply

    let convertedMarketCap = convert(market_cap_usd, currency)
    let convertedVolume24hr = convert(volume24hr, currency)

    convertedMarketCap = format(convertedMarketCap)
    convertedVolume24hr = format(convertedVolume24hr)
    availableSupply = format(availableSupply)
    totalSupply = format(totalSupply)

    const CurrencySym = currencies[currency]

    return (
      <Container>
        <Flex style={{position: 'relative'}}>
          <Rank>
            <span style={{marginRight: '10px'}}>RANK</span>
            <Circle>{rank}</Circle>
          </Rank>
        </Flex>
        <Information>
          <Flex>
            <Box>
              <DataWrap>
                <label>MARKET CAP</label>
                <span><Symbol><CurrencySym /></Symbol> <Num>{convertedMarketCap}</Num></span>
              </DataWrap>
            </Box>
            <Box>
              <DataWrap>
                <label>24H VOLUME</label>
                <span><Symbol><CurrencySym /></Symbol> <Num>{convertedVolume24hr}</Num></span>
              </DataWrap>
            </Box>
          </Flex>
          <Flex>
            <Box>
              <DataWrap>
                <label>CIRCULATING SUPPLY</label>
                <CenterVertical><Num>{availableSupply}</Num> <Sym>{symbol}</Sym></CenterVertical>
              </DataWrap>
            </Box>
            <Box>
              <DataWrap>
                <label>TOTAL SUPPLY</label>
                <CenterVertical><Num>{totalSupply}</Num> <Sym>{symbol}</Sym></CenterVertical>
              </DataWrap>
            </Box>
          </Flex>
        </Information>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  let { crypto } = state
  // let coinsById = _.keyBy(crypto, 'id')
  let coinsById = crypto

  return {
    coinsById,
    crypto: state.crypto,
    currency: state.display.currency
  }
}

export default connect(mapStateToProps)(DetailPage)
