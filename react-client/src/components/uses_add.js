// Adds uses to a product or recipe
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import Menu from './menu'
import UseList from './use_list'
import CreateUse from './create'
import { Link } from 'react-router-dom'
import { fetchUses, searchUses, createUse, addUse } from '../actions/use'
import $ from 'jquery'

class UsesAdd extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  componentDidMount () {
    var refType
    const { id } = this.props.match.params
    const path = this.props.match.path
    if (path.includes('products')) {
      refType = 'product'
    } else {
      refType = 'recipe'
    }
    this.props.fetchUses(id, refType)
  }

  handleSearch (term) {
    this.props.searchUses(term)
  }

  handleCreate (term) {
    let refType
    const { id } = this.props.match.params
    const { path } = this.props.match
    if (path.includes('products')) {
      refType = 'product'
    } else {
      refType = 'recipe'
    }
    const value = {
      title: term,
      category: refType,
      refId: id
    }
    this.props.createUse(value)
      .then(() => $('.toast').toast('show'))
  }

  handleClick (e) {
    const use = e.target.dataset.txt
    const { id } = this.props.match.params
    var refType
    const path = this.props.match.path
    if (path.includes('products')) {
      refType = 'product'
    } else {
      refType = 'recipe'
    }
    this.props.addUse(use, refType, id)
  }

  render () {
    const { match, uses } = this.props
    const path = this.props.match.path

    return (
      <div>
        <Menu />
        <h2>Add Uses</h2>
        <Link
          to={
            path.includes('products')
              ? `/products/${match.params.id}`
              : `/recipes/${match.params.id}`
          }
          className='btn btn-success'
        >
          Done
        </Link>
        <p>Live search to find existing uses.
          Click the link to search on that use.
          Click the Add button to add the use to this item.
          Click the Create button to create a new use with the text in the search bar</p>
        <CreateUse onCreateSubmit={this.handleCreate} onSearchSubmit={this.handleSearch} />
        <UseList uses={uses} handleClick={this.handleClick} btnMode='add' />
        <div className='toast'>
          <div className='toast-header'>
            Success
          </div>
          <div className='toast-body'>
            New Use Created
          </div>
        </div>
      </div>
    )
  }
}
UsesAdd.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }),
    path: PropTypes.string
  }),
  fetchUses: PropTypes.func,
  searchUses: PropTypes.func,
  createUse: PropTypes.func,
  addUse: PropTypes.func,
  uses: PropTypes.array
}
function mapStateToProps ({ uses }) {
  // filter out itemUses from uses so user cant add existing use
  let filtered = []
  if (uses) {
    const u = uses.uses
    if (u) {
      const keys = _.flatMap(uses.itemUses, use => use._id)
      const keyed = _.keyBy(u, '_id')
      let temp = _.omit(keyed, keys)
      filtered = _.values(temp)
    }
  }
  return { uses: filtered }
}

export default connect(mapStateToProps, { fetchUses, searchUses, createUse, addUse })(UsesAdd)
