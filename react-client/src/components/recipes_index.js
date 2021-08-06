import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Menu from './menu'
import CreateRecipe from './create'
import { searchRecipes, createRecipe } from '../actions/recipes'

class RecipesIndex extends Component {
  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.state = { recipes: [] }
  }
  handleSearch (term) {
    searchRecipes(term).then(q => this.setState({ recipes: q.data }))
  }
  handleCreate (title) {
    if (title === '') {
      window.alert("recipe title can't be blank")
    } else {
      // jump to newly created recipe
      createRecipe({ title }, recipe => this.props.history.push(`/recipes/${recipe._id}`))
    }
  }
  renderRecipes (recipes) {
    if (!recipes) return null
    return recipes.map((r, i) => {
      return (
        <Link to={`/recipes/${r._id}`} key={i} className='list-group-item list-group-item-action'>{r.title}</Link>
      )
    })
  }
  render () {
    return (
      <div>
        <Menu page='recipes' />
        <div className='bg-secondary text-light border border-dark'>
          <p>Start typing to live search for Recipes. Enter recipe name & click Create to create recipe.</p>
          <CreateRecipe onCreateSubmit={this.handleCreate} onSearchSubmit={this.handleSearch} />
        </div>
        <h2>Recipes Found</h2>
        <ul className='list-group'>{this.renderRecipes(this.state.recipes)}</ul>
      </div>
    )
  }
}
RecipesIndex.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}
export default RecipesIndex
