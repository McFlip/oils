import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Menu from './menu'
import { fetchUse, deleteUse } from '../actions/use'
import usesShowDropdown from './usesShow_dropdown'

class UsesShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      use: {}
    }
    this.renderProducts = this.renderProducts.bind(this)
    this.renderRecipes = this.renderRecipes.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }
  componentDidMount () {
    const { id } = this.props.match.params
    fetchUse(id).then(res => this.setState({ use: res.data }))
  }
  onDeleteClick () {
    const { id } = this.props.match.params
    deleteUse(id)
      .then(this.props.history.push('/uses'))
  }
  renderProducts (prods) {
    if (!prods) return null
    return (
      <div className='card'>
        <h5 className='card-header alert alert-info'>
          Products
        </h5>
        <ul className='list-group list-group-flush'>
          {
            prods.map((p, i) => {
              return (
                <li className='list-group-item' key={i}>
                  <Link to={`/products/${p._id}`} data-testid='product'>
                    {p.descr}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  renderRecipes (recipes) {
    if (!recipes) return null
    return (
      <div className='card'>
        <h5 className='card-header alert alert-primary'>
          Recipes
        </h5>
        <ul className='list-group list-group-flush'>
          {
            recipes.map((r, i) => {
              return (
                <li className='list-group-item' key={i}>
                  <Link to={`/recipes/${r._id}`} data-testid='recipe'>
                    {r.title}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  render () {
    const { use } = this.state
    if (!use) return (<div>Loading</div>)
    return (
      <div>
        <Menu page='uses' dropdown={usesShowDropdown(this.onDeleteClick)} />
        <h4>Use {use.title} Product and Recipe Listing</h4>
        {this.renderProducts(use.products)}
        {this.renderRecipes(use.recipes)}
      </div>
    )
  }
}

export default UsesShow
