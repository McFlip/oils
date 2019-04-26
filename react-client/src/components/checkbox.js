import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProd } from '../actions/prods'

class Checkbox extends Component {
  constructor (props) {
    super(props)
    this._id = this.props._id

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    if (this.props.readOnly) return
    const { checked } = this.props
    const val = { wishlist: !checked }
    this.props.updateProd(this._id, val)
  }

  render () {
    return (
      <span className='form-group form-check-inline px-2'>
        <label className='form-check-label' htmlFor={`checkbox_${this._id}`}> wishlist </label>
        <input className='form-check-input ml-2' type='checkbox' checked={this.props.checked} id={`checkbox_${this._id}`} onChange={this.toggle} readOnly={this.props.readOnly || false} />
      </span>
    )
  }
}

function mapStateToProps (state, ownProps) {
  if (state.prods[ownProps._id]) return { checked: state.prods[ownProps._id].wishlist }
  return { checked: false }
}

export default connect(mapStateToProps, { updateProd })(Checkbox)
