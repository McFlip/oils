import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchProds, updateInventory, searchProds } from '../actions/prods'
import ProdsList from './prods_list'
import Menu from './menu'
import ProdsDropdown from './prods_dropdown'
import SearchBar from './search_bar'

class ProdsIndex extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleListAll = this.handleListAll.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleFilterWishlist = this.handleFilterWishlist.bind(this)
  }

  handleListAll () {
    this.props.fetchProds()
  }

  handleFilterWishlist () {
    this.props.searchProds('true', 'wishlist')
  }

  handleSearch (term, category) {
    this.props.searchProds(term, category)
  }

  handleSubmit (id, value) {
    this.props.updateInventory(id, value)
  }

  render () {
    return (
      <div>
        <Menu page='products' dropdown={ProdsDropdown(this.handleListAll, this.handleFilterWishlist)} />
        <div className='bg-secondary text-light border border-dark'>
          <h1>Inventory</h1>
          <SearchBar onSearchSubmit={this.handleSearch} subject='inventory' />
        </div>
        <ProdsList prods={this.props.prods} mode='inventory' handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}
ProdsIndex.propTypes = {
  fetchProds: PropTypes.func,
  searchProds: PropTypes.func,
  updateInventory: PropTypes.func,
  prods: PropTypes.object
}
function mapStateToProps ({ prods }) {
  return { prods: _.omit(prods, 'prod') }
}

export default connect(mapStateToProps, { fetchProds, updateInventory, searchProds })(ProdsIndex)
