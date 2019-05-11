import React from 'react'
import { Link } from 'react-router-dom'

const ProdsShowDropdown = (onDeleteClick, id) => {
  return (
    <div className='dropdown-menu'>
      <a className='dropdown-item' href='#'
        onClick={
          (e) => {
            e.preventDefault()
            if (window.confirm("Are you sure? This can't be undone")) onDeleteClick()
          }
        }
      >Delete Product</a>
      <Link className='dropdown-item' to={`/products/${id}/edit`}>Edit Product</Link>
      <Link className='dropdown-item' to={`/products/${id}/editingredients`}>Edit Contents</Link>
      <Link className='dropdown-item' to={`/products/${id}/adduse`}>Add Use</Link>
      <Link className='dropdown-item' to={`/products/${id}/addpost`}>Add Post</Link>
    </div>
  )
}

export default ProdsShowDropdown
