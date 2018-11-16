import React, { Component } from "react";
import { Link } from "react-router-dom";

const Menu = ({page}) => {
  const brandLogo = { width : '40px' };
  const pages = ['products','uses','recipes'];

  function pageLinks(p) {
    let isActive = '';
    if (p == page) isActive = 'active';
    return (
      <li className={`nav-item ${isActive}`} key={p}>
        <Link className="nav-link" to={`/${p}`}>{p}</Link>
      </li>
    );
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
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown">
              Dropdown link
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
