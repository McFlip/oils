import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class IngredientsList extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.renderQty = this.renderQty.bind(this)
    this.renderIngredients = this.renderIngredients.bind(this)
    this.renderProds = this.renderProds.bind(this)
    this.state = {}
  }
  handleSubmit (e) {
    // add ingredient or update quantity
    e.preventDefault()
    const ingrId = e.target.dataset.txt
    let val = this.state[ingrId]
    if (this.props.path === 'products') val = 'n/a'
    if (!val) return null
    const { id } = this.props
    let ingredients = this.props.ingredients
    if (this.props.mode === 'add') {
      ingredients.push({
        'qty': val,
        'product': ingrId
      })
      this.props.updateRecipe(id, { ingredients })
    } else {
      const keyed = _.keyBy(this.props.ingredients, '_id')
      keyed[ingrId].qty = val
      ingredients = _.values(keyed)
      this.props.updateRecipe(id, { ingredients }).then(alert('quantity updated'))
    }
  }
  handleClick (e) {
    // remove ingredient
    const { id, containsId } = this.props
    const ingrId = e.target.dataset.txt
    let ingredients = []
    if (this.props.path === 'products') {
      // this is a kit or blend
      ingredients = _(this.props.containsId).keyBy('product').omit(ingrId).values().value()
    } else {
      // this is a recipe
      ingredients = _(this.props.ingredients).keyBy('_id').omit(ingrId).values().value()
    }
    this.props.updateRecipe(id, { ingredients })
  }
  renderQty (qty, id, btnTxt) {
    if (this.props.mode === 'read') return qty
    return (
      <form onSubmit={e => this.handleSubmit(e)} data-txt={id}>
        {
          this.props.path === 'recipes'
            ? <input
              type='text'
              className='form-control'
              defaultValue={qty}
              onChange={e => this.setState({ [id]: e.target.value })}
            />
            : null
        }
        <button type='submit'>{btnTxt}</button>
      </form>
    )
  }
  renderIngredients (ingredients) {
    // current ingredients
    if (!ingredients) return null
    return ingredients.map((ingredient, i) => {
      return (
        <tr key={i}>
          <th scope='row'>{i + 1}</th>
          <td>
            <Link to={`/products/${ingredient.product ? ingredient.product._id : ingredient._id}`} data-testid='prod'>
              {ingredient.product ? ingredient.product.descr : ingredient.descr}
            </Link>
          </td>
          <td>{this.props.path === 'recipes' ? this.renderQty(ingredient.qty, ingredient._id, 'Change') : null}</td>
          {this.props.mode === 'edit' ? <td><button onClick={e => this.handleClick(e)} data-txt={ingredient._id}>Delete</button></td> : null}
        </tr>
      )
    })
  }
  renderProds (prods, ingredients) {
    // add new ingredients
    if (_.isEmpty(prods)) return null
    const ingrId = _(ingredients).keyBy('product').keys().value()
    prods = _.omit(prods, ingrId)
    return _.map(prods, (prod) => {
      return (
        <tr key={prod._id}>
          <th scope='row' data-testid='sku'>{prod.sku}</th>
          <td>
            <Link to={`/products/${prod._id}`} data-testid='descr'>
              {prod.descr}
            </Link>
            {prod.size}
          </td>
          <td>{this.renderQty('enter qty', prod._id, 'Add')}</td>
        </tr>
      )
    })
  }
  render () {
    return (
      <div className='card'>
        <table className='table table-sm'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Ingredient</th>
              <th scope='col'>Quantity</th>
              {this.props.mode === 'edit' ? <th scope='col'>Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {
              this.props.mode === 'add'
                ? this.renderProds(this.props.prods, this.props.ingredients)
                : this.renderIngredients(this.props.ingredients)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default IngredientsList
