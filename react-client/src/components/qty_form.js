import React, { Component } from 'react'
import 'bootstrap'
import $ from 'jquery'
import Popper from 'popper.js'

class QTY_Form extends Component {
  constructor (props) {
    super(props)
    this.state = { value: this.props.value }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate (prevProps) {
  // compare props and force update to state on prop update
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value })
    }
  }

  // controlled component
  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  // dispatch actions
  handleSubmit (e) {
    e.preventDefault()
    this.props.handleSubmit(this.props._id, { qty: this.state.value })
    $('#qtyModal').modal('toggle')
  }

  render () {
    return (
      <div className='modal fade' id='qtyModal' tabIndex='-1' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <form onSubmit={this.handleSubmit}>
              <div className='modal-header'>
                <h5 className='modal-title' id='qtyModalTitle'>Update Quantity</h5>
                <button type='button' className='close' data-dismiss='modal' onClick={this.props.close} data-testid='xButton'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body form-group'>
                <label htmlFor='qtyInput'> QTY: </label>
                <input type='number' className='form-control' id='qtyInput' value={this.state.value} onChange={this.handleChange} />
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={this.props.close}>Close</button>
                <button type='submit' className='btn btn-primary' >Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default QTY_Form
