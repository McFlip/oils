import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class RecipeList extends Component {
  constructor (props) {
    super(props)
  }

  renderRecipes () {
    return this.props.recipes.map((recipe, i) => {
      return (
        <div className='card' style={{ width: '18rem' }} key={i}>
          <div className='card-header'>
            <Link to={`/recipes/${recipe._id}`} data-testid='recipe'>
              {recipe.title}
            </Link>
          </div>
          <ul className='list-group list-group-flush'>
            {this.renderUses(recipe.uses)}
          </ul>
        </div>
      )
    })
  }

  renderUses (uses) {
    if (!uses) return (<div>no uses</div>)
    return uses.map((use, i) => {
      return (
        <li className='list-group-item' key={i}>
          {use.title}
        </li>
      )
    })
  }

  render () {
    return (
      <div>
        <h6>Recipes:</h6>
        <div>
          {this.props.recipes ? this.renderRecipes() : null}
        </div>
      </div>
    )
  }
}
export default RecipeList
