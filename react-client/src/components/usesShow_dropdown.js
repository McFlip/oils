import React from 'react'
// import $ from 'jquery'

const usesShowDropdown = (onDeleteClick) => {
  return (
    <div className='dropdown-menu'>
      <a className='dropdown-item' href='#'
        onClick={
          (e) => {
            e.preventDefault()
            if (confirm("Are you sure? This can't be undone")) onDeleteClick()
          }
        }
      >Delete Use</a>
    </div>
  )
}

export default usesShowDropdown
