import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Menu from './menu'
import RecipeTitle from './recipe_title'
import UseList from './use_list'
import { fetchRecipe, updateRecipe } from '../actions/recipes'
import { removeUse } from '../actions/use'

class RecipesShow extends Component {
  constructor (props) {
    super(props)
    this.renderIngredients = this.renderIngredients.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemoveUse = this.handleRemoveUse.bind(this)
    const {id}  = this.props.match.params
    this.state = {
      id
    }
  }
  componentDidMount () {
    this.props.fetchRecipe(this.state.id)
  }
  handleSubmit (title) {
    this.props.updateRecipe(this.state.id, {title})
  }
  handleRemoveUse (e){
    const use = e.target.dataset.txt
    this.props.removeUse(use, 'recipe', this.state.id)
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

  render () {
    const { recipe } = this.props
    if (!recipe) return (<div>Loading</div>)
    const { title, uses, ingredients, directions } = recipe
    return (
      <div>
        <Menu page='recipes' />
        <RecipeTitle title={title} handleSubmit={this.handleSubmit} />
        <h4>Uses</h4>
        <Link to={`/recipes/${this.state.id}/adduse`} className='btn btn-secondary'>Edit</Link>
        <UseList uses={uses} id={this.state.id} handleClick={this.handleRemoveUse} />
        <h4>Ingredients</h4>
        {this.renderIngredients(ingredients)}
        <div className='card'>
          <h4 className='card-header'>Directions</h4>
          <div className='card-body' dangerouslySetInnerHTML={{ __html: directions }} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({recipes: {recipe}}) => ({ recipe })

export default connect(mapStateToProps, { fetchRecipe, updateRecipe, removeUse })(RecipesShow)
