import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class UseList extends Component {
  constructor (props) {
    super(props)
  }

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
              className={this.props.btnMode == 'add' ? 'btn btn-outline-primary float-right' : 'btn btn-outline-danger float-right'}
            >
              { this.props.btnMode == 'add' ? 'Add' : 'Delete' }
            </button>
          </span>
        </li>
      )
    })
  }

  render () {
    return (
      <div>
        <h6>Uses:</h6>
        <ul className='list-group'>
          {this.renderUses()}
        </ul>
      </div>
    )
  }
}
export default UseList
