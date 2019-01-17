import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import numeral from 'numeral'

let darkBlue = '19,36,62'
let lighterBlue = '29,49,82'

let superLightBlue = '#417bca'
let circleBlue = '#1A3353'
let textBlue = '#798dbf'
let green = '#34d28a'

const Container = styled.div`
  display: flex;
  align-items: flexx-start;
  color: ${textBlue};
  height: 100%;
  background: #141E30;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  background: #141E30;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #1C3051, #12233D);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #1C3051, #12233D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  

  h2, h3 {
    margin: 0;
    padding: 0;
  }
`

const Information = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  max-height: 35%;
`

const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DataWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;

  label {
    margin-bottom: 10px;
  }
`

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: superLightBlue;
  background-color: #1e385a;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const Flex = styled.div`
  display: flex;
  flex: 1;
  span {
    margin-right: 15px;
  }
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
  color: #fff;
`
const Sym = styled.span`
  color: ${green};
  font-weight: bold;
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

    let { available_supply: availableSupply, symbol, rank } = coin

    // Circulating Supply = available_supply
    // Total Supply = max_supply/total_supply

    const format = num => numeral(num).format('0,0')

    currency = currency.toLowerCase()
    let currentMarketCap = coin[`market_cap_${currency}`]
    let volume24hr = coin[`24h_volume_${currency}`]
    let totalSupply = coin['max_supply'] || coin['total_supply']
    currentMarketCap = format(currentMarketCap)
    availableSupply = format(availableSupply)
    totalSupply = format(totalSupply)
    volume24hr = format(volume24hr)

    return (
      <Container>
        <Flex style={{position: 'relative'}}>
          <Rank>
            <span>RANK</span>
            <Circle>{rank}</Circle>
          </Rank>
        </Flex>
        <Information>
          <Flex>
            <Box>
              <DataWrap>
                <label>MARKET CAP</label>
                <span>$ <Num>{currentMarketCap}</Num></span>
              </DataWrap>
            </Box>
            <Box>
              <DataWrap>
                <label>24H VOLUME</label>
                <span>$ <Num>{volume24hr}</Num></span>
              </DataWrap>
            </Box>
          </Flex>
          <Flex>
            <Box>
              <DataWrap>
                <label>CIRCULATING SUPPLY</label>
                <span><Num>{availableSupply}</Num> <Sym>{symbol}</Sym></span>
              </DataWrap>
            </Box>
            <Box>
              <DataWrap>
                <label>TOTAL SUPPLY</label>
                <span><Num>{totalSupply}</Num> <Sym>{symbol}</Sym></span>
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
  let coinsById = _.keyBy(crypto, 'id')
  return {
    coinsById,
    crypto: state.crypto,
    currency: state.display.currency
  }
}

export default connect(mapStateToProps)(DetailPage)
