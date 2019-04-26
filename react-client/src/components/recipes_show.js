import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Menu from './menu'
import { fetchRecipe } from '../actions/recipes'

class RecipesShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recipe: {}
    }
    this.renderIngredients = this.renderIngredients.bind(this)
    this.renderUses = this.renderUses.bind(this)
  }
  componentDidMount () {
    const { id } = this.props.match.params
    fetchRecipe(id).then(res => this.setState({ recipe: res.data }))
  }
  renderIngredients (ingredients) {
    if (!ingredients) return null
    return (
      <table className='table table-sm'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Ingredient</th>
            <th scope='col'>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {
            ingredients.map((ingredient, i) => {
              return (
                <tr key={i}>
                  <th scope='row'>{i + 1}</th>
                  <td>
                    <Link to={`/products/${ingredient.product._id}`} data-testid='prod'>
                      {ingredient.product.descr}
                    </Link>
                  </td>
                  <td>{ingredient.qty}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
  renderUses (uses) {
    if (!uses) return null
    return (
      <div className='card'>
        <h5 className='card-header'>
          Uses
        </h5>
        <ul className='list-group list-group-flush'>
          {
            uses.map((use, i) => {
              return (
                <li className='list-group-item' key={i}>
                  <Link to={`/uses/${use._id}`} data-testid='use'>
                    {use.title}
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
    const { recipe } = this.state
    if (!recipe) return (<div>Loading</div>)
    return (
      <div>
        <Menu page='recipes' />
        <h3>Recipe {recipe.title} Details</h3>
        {this.renderUses(recipe.uses)}
        <h4>Ingredients</h4>
        {this.renderIngredients(recipe.ingredients)}
        <div className='card'>
          <h4 className='card-header'>Directions</h4>
          <div className='card-body' dangerouslySetInnerHTML={{ __html: recipe.directions }} />
        </div>
      </div>
    )
  }
}

export default RecipesShow
