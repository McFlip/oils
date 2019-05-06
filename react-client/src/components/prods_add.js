import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Menu from './menu'
import SearchBar from './search_bar'
import { Link } from 'react-router-dom'
import { fetchRecipe, updateRecipe } from '../actions/recipes'
import { searchProds, fetchProd, updateProd } from '../actions/prods'
import IngredientsList from './ingredients_list'

export class ProdsAdd extends Component {
  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    const { path } = this.props.match
    const mode = path.includes('products') ? 'products' : 'recipes'
    this.state = {
      id: this.props.match.params.id,
      mode
    }
  }
  componentDidMount () {
    if (this.state.mode === 'recipes') {
      this.props.fetchRecipe(this.state.id)
    } else {
      this.props.fetchProd(this.state.id)
    }
  }
  handleSearch (term, category) {
    this.props.searchProds(term, category)
  }
  render () {
    if (!this.props.recipe && !this.props.prods.prod) return (<div>loading</div>)
    // recipes have ingredients and kits have contents
    const ingredients = this.props.recipe ? this.props.recipe.ingredients : null
    const contains = this.props.prods.prod ? this.props.prods.prod.contains : null
    const containsId = this.props.prods.prod ? this.props.prods.prod.ingredients : null
    return (
      <div>
        <Menu page={`${this.state.mode}`} />
        <h1>Edit ingredients list</h1>
        <Link to={`/${this.state.mode}/${this.state.id}`} className='btn btn-success'>Done</Link>
        <h2>Existing ingredients</h2>
        <IngredientsList
          ingredients={ingredients || contains}
          containsId={containsId}
          path={this.state.mode}
          mode='edit'
          id={this.state.id}
          updateRecipe={this.state.mode === 'recipes' ? this.props.updateRecipe : this.props.updateProd}
        />
        <h2>Add new ingredients</h2>
        <SearchBar onSearchSubmit={this.handleSearch} subject='inventory' />
        <IngredientsList
          ingredients={ingredients || containsId}
          prods={_.omit(this.props.prods, 'prod')}
          path={this.state.mode}
          mode='add'
          id={this.state.id}
          updateRecipe={this.state.mode === 'recipes' ? this.props.updateRecipe : this.props.updateProd}
        />
      </div>
    )
  }
}
const mapStateToProps = ({ prods, recipes: { recipe } }, ownProps) => {
  prods = _.omit(prods, ownProps.match.params.id)
  return { prods, recipe }
}

export default connect(mapStateToProps, { searchProds, fetchProd, updateProd, fetchRecipe, updateRecipe })(ProdsAdd)
