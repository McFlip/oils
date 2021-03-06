import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateInventory } from '../actions/prods'
import PropTypes from 'prop-types'

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
    this.props.updateInventory(this._id, val)
  }

  render () {
    return (
      <span className='form-group form-check-inline px-2'>
        <label className='form-check-label' htmlFor={`checkbox_${this._id}`}> wishlist </label>
        <input className='form-check-input ml-2' type='checkbox' checked={!!this.props.checked} id={`checkbox_${this._id}`} onChange={this.toggle} readOnly={this.props.readOnly || false} />
      </span>
    )
  }
}

Checkbox.propTypes = {
  _id: PropTypes.string,
  readOnly: PropTypes.bool,
  checked: PropTypes.bool,
  updateInventory: PropTypes.func
}

function mapStateToProps (state, ownProps) {
  if (state.prods[ownProps._id]) return { checked: state.prods[ownProps._id].wishlist }
  return { checked: false }
}

export default connect(mapStateToProps, { updateInventory })(Checkbox)
