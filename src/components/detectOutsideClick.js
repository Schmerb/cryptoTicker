import React, { Component } from 'react'

export default class DetectOutsideClick extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    // mount listener for clicks outside child
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount () {
    // remove listener
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      // console.log('You clicked outside of me!')
      let { handleClickAtChild } = this.props
      handleClickAtChild && handleClickAtChild()
    }
  }

  render () {
    return (
      <div ref={this.setWrapperRef}>
        {this.props.children}
      </div>
    )
  }
}
