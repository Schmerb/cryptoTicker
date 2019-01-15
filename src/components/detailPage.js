import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div``

class DetailPage extends Component {
  render () {
    return (
      <Container>
        <h2>Detail Page</h2>
      </Container>
    )
  }
}

const mapStateToProps = (store) => ({

})

export default connect(mapStateToProps)(DetailPage)
