import React, { Component } from "react";
import { Link } from "react-router-dom";

const ProdsDropdown = () => {
  return (
    <div className="dropdown-menu">
      <Link className="dropdown-item" to="/prods_new">New Inventory Item</Link>
      <a className="dropdown-item" href="#">Filter Wishlist</a>
    </div>
  );
}

export default ProdsDropdown;
