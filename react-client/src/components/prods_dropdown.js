import React from 'react'
import { Link } from 'react-router-dom'

const ProdsDropdown = (handleListAll, handleFilterWishlist) => {
  return (
    <div className='dropdown-menu'>
      <a className='dropdown-item' href='#'
        onClick={
          (e) => {
            e.preventDefault()
            handleListAll()
          }
        }
      >List All</a>
      <Link className='dropdown-item' to='/products/new'>New Inventory Item</Link>
      <a className='dropdown-item' href='#'
        onClick={
          (e) => {
            e.preventDefault()
            handleFilterWishlist()
          }
        }
      >Filter Wishlist</a>
    </div>
  )
}

export default ProdsDropdown
