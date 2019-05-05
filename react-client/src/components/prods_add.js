import React, { Component } from 'react'
import { connect } from 'react-redux'
import Menu from './menu'
import SearchBar from './search_bar'
import { Link } from 'react-router-dom'
import { fetchRecipe, updateRecipe } from '../actions/recipes'
import { searchProds, fetchProd } from '../actions/prods'
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
    if (!this.props.recipe && !this.props.prod) return (<div>loading</div>)
    const ingredients = this.props.recipe ? this.props.recipe.ingredients : null
    const contains = this.props.prod ? this.props.prod.contains : null
    return (
      <div>
        <Menu page={`${this.state.mode}`} />
        <h1>Edit ingredients list</h1>
        <Link to={`/${this.state.mode}/${this.state.id}`} className='btn btn-success'>Done</Link>
        <h2>Existing ingredients</h2>
        <IngredientsList ingredients={ingredients || contains} mode='edit' id={this.state.id} updateRecipe={this.props.updateRecipe} />
        <h2>Add new ingredients</h2>
        <SearchBar onSearchSubmit={this.handleSearch} subject='inventory' />
        <IngredientsList prods={this.props.prods} ingredients={ingredients || contains} mode='add' id={this.state.id} updateRecipe={this.props.updateRecipe} />
      </div>
    )
  }
}
function mapStateToProps ({ prods, recipes }, ownProps) {
  return { prod: prods[ownProps.match.params.id], prods, recipe: recipes.recipe }
}
export default connect(mapStateToProps, { searchProds, fetchProd, fetchRecipe, updateRecipe })(ProdsAdd)
