import React, { Component } from 'react'
import { connect } from 'react-redux'
import Menu from './menu'
import RecipeTitle from './recipe_title'
import UseList from './use_list'
import IngredientsList from './ingredients_list'
import RecipeDirections from './recipe_directions'
import { fetchRecipe, updateRecipe, deleteRecipe } from '../actions/recipes'
import { removeUse } from '../actions/use'
import RecipesShowDropdown from './recipesShow_dropdown';

class RecipesShow extends Component {
  constructor (props) {
    super(props)
    this.handleTitleSubmit = this.handleTitleSubmit.bind(this)
    this.handleRemoveUse = this.handleRemoveUse.bind(this)
    this.handleDirectionsSubmit = this.handleDirectionsSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    const { id } = this.props.match.params
    this.state = {
      id
    }
  }
  componentDidMount () {
    this.props.fetchRecipe(this.state.id)
  }
  handleTitleSubmit (title) {
    this.props.updateRecipe(this.state.id, { title })
  }
  handleDirectionsSubmit (directions) {
    this.props.updateRecipe(this.state.id, { directions })
  }
  handleRemoveUse (e) {
    const use = e.target.dataset.txt
    this.props.removeUse(use, 'recipe', this.state.id)
  }
  onDeleteClick () {
    this.props.deleteRecipe(this.state.id)
      .then(this.props.history.push('/recipes'))
  }
  render () {
    const { recipe } = this.props
    if (!recipe) return (<div>Loading</div>)
    const { title, uses, ingredients, directions } = recipe
    return (
      <div>
        <Menu page='recipes' dropdown={RecipesShowDropdown(this.onDeleteClick, this.state.id)} />
        <RecipeTitle title={title} handleSubmit={this.handleTitleSubmit} />
        <UseList uses={uses} id={this.state.id} handleClick={this.handleRemoveUse} />
        <h4>Ingredients</h4>
        <IngredientsList ingredients={ingredients} mode='read' path='recipes' />
        <RecipeDirections value={directions} handleSubmit={this.handleDirectionsSubmit} />
      </div>
    )
  }
}

const mapStateToProps = ({ recipes: { recipe } }) => ({ recipe })

export default connect(mapStateToProps, { fetchRecipe, updateRecipe, removeUse, deleteRecipe })(RecipesShow)
