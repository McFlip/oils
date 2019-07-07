import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Menu = ({ page, dropdown }) => {
  const pages = ['products', 'uses', 'recipes']

  function pageLinks (p) {
    let isActive = ''
    if (p === page) isActive = 'active'
    return (
      <li className={`nav-item ${isActive}`} key={p}>
        <Link className='nav-link' to={`/${p}`}>{p}</Link>
      </li>
    )
  }

  function renderDropDown () {
    return (
      <li className='nav-item dropdown'>
        <a className='nav-link dropdown-toggle' href='#' id='navbarDropdownMenuLink' role='button' data-toggle='dropdown'>
            Actions
        </a>
        {dropdown}
      </li>
    )
  }

  return (
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'>
      <Link className='navbar-brand' to='/'>
        <img src='/favicon.ico' alt='Home' />
      </Link>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavDropdown'>
        <span className='navbar-toggler-icon' />
      </button>
      <div className='collapse navbar-collapse' id='navbarNavDropdown'>
        <ul className='navbar-nav'>
          { pages.map(pageLinks) }
          { dropdown && renderDropDown() }
        </ul>
      </div>
    </nav>
  )
}

Menu.propTypes = {
  page: PropTypes.oneOf(['home', 'products', 'recipes', 'uses']),
  dropdown: PropTypes.element
}
export default Menu
