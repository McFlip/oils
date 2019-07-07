import React, { Component } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import DOMPurify from 'dompurify'
import marked from 'marked'

class RecipeDirections extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderDirections = this.renderDirections.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {
      value: props.value
    }
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
    const clean = DOMPurify.sanitize(this.state.value)
    this.props.handleSubmit(clean)
    $('#editModal').modal('toggle')
  }
  // launch modal
  handleClick () {
    $('#editModal').modal('toggle')
  }
  handleCancel () {
    this.setState({ value: this.props.value })
    this.handleClick()
  }
  renderDirections () {
    const clean = DOMPurify.sanitize(this.state.value)
    const md = marked(clean)
    return (<div className='card-body' data-testid='directionsDisplay' dangerouslySetInnerHTML={{ __html: md }} />)
  }
  render () {
    return (
      <div>
        <div className='card'>
          <h4 className='card-header bg-secondary text-light'>Directions</h4>
          {this.renderDirections()}
        </div>
        <div className='modal fade' id='editModal' tabIndex='-1' role='dialog'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <form onSubmit={this.handleSubmit}>
                <div className='modal-header'>
                  <h5 className='modal-title' id='editModalTitle'>Update Directions</h5>
                  <button type='button' className='close' data-dismiss='modal' data-testid='xButton'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body form-group'>
                  <label htmlFor='dirInput'>Markdown <a href='https://guides.github.com/features/mastering-markdown/'>tutorial</a></label>
                  <textarea className='form-control' id='dirInput' data-testid='directions' value={this.state.value} onChange={this.handleChange} />
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-danger' data-dismiss='modal' onClick={this.handleCancel}>Cancel</button>
                  <button type='submit' className='btn btn-primary' data-testid='dirSubmit' >Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
RecipeDirections.propTypes = {
  value: PropTypes.string,
  handleSubmit: PropTypes.func
}
export default RecipeDirections
