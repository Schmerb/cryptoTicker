import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Spinner from 'react-spinkit'

import Banner from 'components/banner/index'
import Currencies from 'components/currencies/index'
import DetailPage from 'components/detailPage'
import DetectScreenSize from 'components/detectScreenSize'

import { updateDimensions } from 'actions/display'

import './app.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: all 0.5s;
`

const Main = styled.main`
  flex: 1;
`

const SpinnerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  componentDidMount = () => {
    this.setState({ visible: true })
  }

  setScreenDimensions = ({width, height}) => {
    // console.log('setScreenDimensions')
    // console.log({width, height})
    let { dispatch } = this.props
    dispatch(updateDimensions({width, height}))
  }

  renderSpinner = () => {
    return (
      <SpinnerWrap>
        <Spinner name='three-bounce' color='coral' fadeIn='none' />
      </SpinnerWrap>
    )
  }

  render () {
    let { noData, location, fetching } = this.props
    if (location.pathname === '/') {
      return <Redirect from='/' to='/app' />
    }
    return (
      <Container>
        {(fetching || noData) && this.renderSpinner()}
        <Banner />
        <DetectScreenSize
          handleResize={this.setScreenDimensions}
          getDimensions={this.setScreenDimensions} />
        <Main role='main'>
          <Route exact path='/app' component={Currencies} />
          <Route path='/app/:id' component={DetailPage} />
        </Main>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  let { crypto, display } = state
  let { currency, fetching } = display
  let noData = Object.keys(crypto).length === 0
  return {
    fetching,
    noData,
    crypto,
    currency
  }
}

export default withRouter(connect(mapStateToProps)(App))
