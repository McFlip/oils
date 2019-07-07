import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = { term: '', category: 'sku' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    return (
      <div className='card'>
        <form onSubmit={this.handleSubmit}>
          {this.props.subject === 'inventory' && <label htmlFor='searchInput'>Search</label>}
          <div className='input-group'>
            <div className='input-group-prepend'>
              {this.props.subject === 'inventory'
                ? <select
                  value={this.state.category}
                  className='input-group-text'
                  onChange={event => this.onSelectChange(event.target.value)}
                  data-testid='searchSelect'
                >
                  <option value='sku'>Item #</option>
                  <option value='descr'>Description</option>
                </select>
                : <span className='input-group-text'>Search</span>
              }
            </div>
            <input
              id='searchInput'
              value={this.state.term}
              onChange={event => this.onInputChange(event.target.value)}
              className='form-control'
              data-testid='searchInput'
            />
            <div className='input-group-append'>
              <button className='btn btn-outline-secondary' type='submit' data-testid='Search'>Search</button>
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

  onSelectChange (category) {
    this.setState({ category })
  }

  // dispatch actions
  handleSubmit (e) {
    e.preventDefault()
    this.props.onSearchSubmit(this.state.term, this.state.category)
  }
}
SearchBar.propTypes = {
  subject: PropTypes.oneOf(['inventory', 'uses']),
  onSearchSubmit: PropTypes.func
}
export default SearchBar
