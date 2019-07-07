import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class UseList extends Component {
  renderUses () {
    return this.props.uses.map((use, i) => {
      return (
        <li className='list-group-item input-group' key={i}>
          <span data-testid='use'>
            <Link to={`/uses/${use._id}`} data-testid='use'>
              {use.title}
            </Link>
          </span>
          <span className='px-2'>
            <button onClick={e => this.props.handleClick(e)} data-txt={use._id} data-testid='use-btn'
              className={this.props.btnMode === 'add' ? 'btn btn-outline-primary float-right' : 'btn btn-outline-danger float-right'}
            >
              { this.props.btnMode === 'add' ? 'Add' : 'Delete' }
            </button>
          </span>
        </li>
      )
    })
  }

  render () {
    return (
      <div className='card' >
        <h4>Uses:</h4>
        <ul className='list-group'>
          {this.renderUses()}
        </ul>
      </div>
    )
  }
}
UseList.propTypes = {
  uses: PropTypes.array,
  handleClick: PropTypes.func,
  btnMode: PropTypes.oneOf(['add'])
}
export default UseList
