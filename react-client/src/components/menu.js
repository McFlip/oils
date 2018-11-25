import React, { Component } from "react";
import { Link } from "react-router-dom";

const Menu = ({page, dropdown}) => {
  const brandLogo = { width : '40px' };
  const pages = ['products','uses','recipes'];
  const pagesDropDown = ['products'];

  function pageLinks(p) {
    let isActive = '';
    if (p == page) isActive = 'active';
    return (
      <li className={`nav-item ${isActive}`} key={p}>
        <Link className="nav-link" to={`/${p}`}>{p}</Link>
      </li>
    );
  }

  function renderDropDown() {
    if (pagesDropDown.find(p => p == page)) {
      return (
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown">
            Actions
          </a>
          {dropdown}
        </li>
      );
    } else {
      return null;
    }
  }

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <Link className="navbar-brand" to="/">
        <img src="/favicon.ico" alt="Home" style={brandLogo}/>
      </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          { pages.map(pageLinks) }
          { renderDropDown() }
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
