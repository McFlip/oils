import React from 'react'
import { Link } from 'react-router-dom'

const IngredientsList = ({ingredients, mode, handleClick, handleSubmit}) => {
  if (!ingredients) return null
  const renderQty = (qty) => {
    if (mode == 'read') return qty
    return(
      <form onSubmit={e => handleSubmit(e)}>
        <input type='text' className='form-control' defaultValue={qty} />
        <button type='submit'>Change</button>
      </form>
    )
  }
  return (
    <table className='table table-sm'>
      <thead className='thead-dark'>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Ingredient</th>
          <th scope='col'>Quantity</th>
          {mode == 'edit' ? <th scope='col'>Action</th> : null}
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
                <td>{renderQty(ingredient.qty)}</td>
                {mode == 'edit' ? <td><button onClick={handleClick}>Delete</button></td> : null}
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default IngredientsList
