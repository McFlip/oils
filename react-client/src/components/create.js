import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Create extends Component {
  constructor (props) {
    super(props)

    this.state = { term: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    return (
      <div className='card'>
        <form onSubmit={this.handleSubmit}>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Create</span>
            </div>
            <input
              id='createUseInput'
              value={this.state.term}
              onChange={event => this.onInputChange(event.target.value)}
              className='form-control'
              data-testid='createUseInput'
            />
            <div className='input-group-append'>
              <button className='btn btn-outline-secondary' type='submit' data-testid='Create'>Create</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  // controlled component
  onInputChange (term) {
    this.setState({ term })
  }

  // dispatch actions
  handleSubmit (e) {
    e.preventDefault()
    this.props.onCreateSubmit(this.state.term)
  }
}

Create.propTypes = {
  onCreateSubmit: PropTypes.func
}

export default Create
