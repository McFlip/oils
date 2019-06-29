import React, { Component } from 'react'

export default class QtyButton extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.stopPropagation()
    this.props.handleClick(this.props._id, this.props.qty)
  }

  render () {
    return (
      <button
        type='button'
        className='btn btn-primary px-2'
        data-toggle='modal'
        data-target='#qtyModal'
        data-testid='qtyButton'
        onClick={this.handleClick}
      >
        QTY:
        <span className='badge badge-light' data-testid='qty'>
          {this.props.qty}
        </span>
      </button>
    )
  }
}
