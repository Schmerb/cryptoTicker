import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import Banner from 'components/banner/index'
import Currencies from 'components/currencies/index'
import DetailPage from 'components/detailPage'

import './app.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Main = styled.main`
  flex: 1
`

class App extends Component {
  render () {
    if (this.props.location.pathname === '/') {
      return <Redirect from='/' to='/app' />
    }
    return (
      <Container>
        <Banner />
        <Main role='main'>
          <Route exact path='/app' component={Currencies} />
          <Route path='/app/:id' component={DetailPage} />
        </Main>
      </Container>
    )
  }
}

export default withRouter(App)
