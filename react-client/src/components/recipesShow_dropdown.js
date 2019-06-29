import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

const RecipesShowDropdown = (onDeleteClick, id) => {
  return (
    <div>
      <div className='dropdown-menu'>
        <a className='dropdown-item' href='#'
          onClick={
            (e) => {
              e.preventDefault()
              $('#titleModal').modal('toggle')
            }
          }
        >Edit Title</a>
        <Link to={`/recipes/${id}/adduse`} className='dropdown-item'>Add use</Link>
        <Link to={`/recipes/${id}/editingredients`} className='dropdown-item'>Edit ingredients</Link>
        <a className='dropdown-item' href='#'
          onClick={
            (e) => {
              e.preventDefault()
              $('#editModal').modal('toggle')
            }
          }
        >Edit directions</a>
        <a className='dropdown-item' href='#'
          onClick={
            (e) => {
              e.preventDefault()
              if (window.confirm("Are you sure? This can't be undone")) onDeleteClick()
            }
          }
        >Delete Recipe</a>
      </div>
    </div>
  )
}

export default RecipesShowDropdown
