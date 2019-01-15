import React, { Component } from 'react'
import styled from 'styled-components'

const Header = styled.header`
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  padding: 0 50px;
`
// const Container = styled.div`

// `

const Title = styled.h2`
  margin: 0;
`

export default class Banner extends Component {
  render () {
    return (
      <Header>
        <Title>VFCrypto</Title>
        <select>
          <option>USD</option>
          <option>GBP</option>
          <option>EUR</option>
          <option>JPY</option>
          <option>KRW</option>
        </select>
      </Header>
    )
  }
}
