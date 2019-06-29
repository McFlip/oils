import React, { Component } from 'react'
import 'bootstrap'
import $ from 'jquery'
// eslint-disable-next-line no-unused-vars
import Popper from 'popper.js'
class RecipeTitle extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      value: props.title
    }
  }

  componentDidUpdate (prevProps) {
  // compare props and force update to state on prop update
    if (this.props.title !== prevProps.title) {
      this.setState({ value: this.props.title })
    }
  }

  // controlled component
  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  // dispatch actions
  handleSubmit (e) {
    e.preventDefault()
    this.props.handleSubmit(this.state.value)
    $('#titleModal').modal('toggle')
  }

  render () {
    return (
      <div>
        <div>
          <h1>Recipe Details</h1>
          <h2 data-testid='titleDisplay'>{this.props.title}</h2>
        </div>
        <div className='modal fade' id='titleModal' tabIndex='-1' role='dialog'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <form onSubmit={this.handleSubmit}>
                <div className='modal-header'>
                  <h5 className='modal-title' id='qtyModalTitle'>Update Title</h5>
                  <button type='button' className='close' data-dismiss='modal' data-testid='xButton'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body form-group'>
                  <label htmlFor='titleInput'>Title:</label>
                  <input type='text' className='form-control' id='titleInput' value={this.state.value} onChange={this.handleChange} />
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={this.props.close}>Close</button>
                  <button type='submit' className='btn btn-primary' data-testid='title-save' >Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeTitle
