import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Menu from './menu'
import SearchBar from './search_bar'
import { searchUses } from '../actions/use'

class UsesIndex extends Component {
  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = { uses: [] }
  }
  handleSearch (term) {
    searchUses(term).payload.then(q => this.setState({ uses: q.data }))
  }
  renderUses (uses) {
    if (!uses) return null
    return uses.map((u, i) => {
      return (
        <Link to={`/uses/${u._id}`} key={i} className='list-group-item list-group-item-action'>{u.title}</Link>
      )
    })
  }
  render () {
    return (
      <div>
        <Menu page='uses' />
        <p>Click Search without search term to list all available uses</p>
        <SearchBar onSearchSubmit={this.handleSearch} subject='uses' />
        <h2>Uses Found</h2>
        <ul className='list-group'>{this.renderUses(this.state.uses)}</ul>
      </div>
    )
  }
}

export default UsesIndex
