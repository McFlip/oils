import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class RecipeList extends Component {
  renderRecipes () {
    return this.props.recipes.map((recipe, i) => {
      return (
        <div className='card' key={i}>
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
    const titles = _.keyBy(this.props.titles, '_id')

    return uses.map((use, i) => {
      return (
        <li className='list-group-item' key={i}>
          {titles[use].title}
        </li>
      )
    })
  }
  render () {
    return (
      <div className='card'>
        <div>
          {this.props.recipes && this.renderRecipes()}
        </div>
      </div>
    )
  }
}
export default RecipeList
