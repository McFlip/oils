import React, { Component } from 'react'
import { connect } from 'react-redux'
import Menu from './menu'
import SearchBar from './search_bar'
import { Link } from 'react-router-dom'
import { fetchRecipe, updateRecipe } from '../actions/recipes'
import { searchProds } from '../actions/prods'
import IngredientsList from './ingredients_list'

export class ProdsAdd extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = {
      id: this.props.match.params.id
    }
  }
  componentDidMount() {
    this.props.fetchRecipe(this.state.id)
  }

  handleSearch(term, category) {
    this.props.searchProds(term, category)
  }
  render() {
    if (!this.props.recipe) return (<div>loading</div>)
    const { ingredients } = this.props.recipe
    return (
      <div>
        <Menu page='recipes' />
        <h1>Add products to ingredients list</h1>
        <Link to={`/recipes/${this.state.id}`} className='btn btn-success'>Done</Link>
        <h2>Existing ingredients</h2>
        <IngredientsList ingredients={ingredients} mode='edit' id={this.state.id} updateRecipe={this.props.updateRecipe} />
        <h2>Add new ingredients</h2>
        <SearchBar onSearchSubmit={this.handleSearch} />
        <IngredientsList prods={this.props.prods} ingredients={ingredients} mode='add' id={this.state.id} updateRecipe={this.props.updateRecipe} />
      </div>
    )
  }
}
function mapStateToProps({ prods, recipes }) {
  return { prods, recipe: recipes.recipe }
}
export default connect(mapStateToProps, { searchProds, fetchRecipe, updateRecipe })(ProdsAdd)
