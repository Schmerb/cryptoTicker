import React, { Component } from 'react'
import styled from 'styled-components'

import Banner from 'components/banner'
import Currencies from 'components/currencies/index'

import './app.css'

const Container = styled.div``

const Main = styled.main``

class App extends Component {
  render () {
    return (
      <Container className='App'>
        <Banner />
        <Main>
          <Currencies />
        </Main>
      </Container>
    )
  }
}

export default App
