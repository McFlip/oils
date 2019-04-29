import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { updateRecipe } from '../actions/recipes'

  class IngredientsList extends Component{
    constructor(props) {
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.renderQty = this.renderQty.bind(this)
      this.state = {}
    }
    handleSubmit(e){
      e.preventDefault()
      const ingrId = e.target.dataset.txt
      const val = this.state[ingrId]
      if(!val) return null 
      const {id} = this.props
      const keyed = _.keyBy(this.props.ingredients, 'product._id')
      keyed[ingrId].qty = val
      const ingredients = _.values(keyed)
      updateRecipe(id, {ingredients}).then(alert('quantity updated'))
    }
    handleClick(){
      // TODO: remove ingredient
    }
    renderQty (qty, id) {
      if (this.props.mode == 'read') return qty
      return(
        <form onSubmit={e => this.handleSubmit(e)} data-txt={id}>
          <input 
            type='text' 
            className='form-control' 
            defaultValue={qty} 
            onChange={e => this.setState({[id]: e.target.value})
            }
          />
          <button type='submit'>Change</button>
        </form>
      )
    }
    render(){
      if (!this.props.ingredients) return null
      return (
        <table className='table table-sm'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Ingredient</th>
              <th scope='col'>Quantity</th>
              {this.props.mode == 'edit' ? <th scope='col'>Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {
              this.props.ingredients.map((ingredient, i) => {
                return (
                  <tr key={i}>
                    <th scope='row'>{i + 1}</th>
                    <td>
                      <Link to={`/products/${ingredient.product._id}`} data-testid='prod'>
                        {ingredient.product.descr}
                      </Link>
                    </td>
                    <td>{this.renderQty(ingredient.qty, ingredient.product._id)}</td>
                    {this.props.mode == 'edit' ? <td><button onClick={this.handleClick}>Delete</button></td> : null}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      )
    }
}

export default IngredientsList
