import React, { Component } from 'react'

export default class DetectScreenSize extends Component {
  constructor (props) {
    super(props)

    this.state = {

    }

    // settings throttling resize event
    this.delay = 100 // delay between calls
    this.throttled = false // are we currently throttled?
    this.calls = 0
  }

  componentDidMount () {
    this.broadcastDiemsions()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node
  }

  handleResize = () => {
    console.log('handleResize')
    // only run if we're not throttled
    if (!this.throttled) {
      // actual callback action
      // const dimensions = this.getDimensions()
      // this.props.handleResize(dimensions)
      this.broadcastDiemsions()
      // we're throttled!
      this.throttled = true
      // set a timeout to un-throttle
      setTimeout(() => {
        this.throttled = false
      }, this.delay)
    }
  }

  broadcastDiemsions = () => {
    const dimensions = this.getDimensions()
    this.props.handleResize(dimensions)
  }

  getDimensions = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    return { width, height }
  }

  render () {
    return (
      <div />
    )
  }
}
