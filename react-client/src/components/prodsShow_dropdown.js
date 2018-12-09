import React from "react";
import { Link } from "react-router-dom";

const ProdsShowDropdown = (onDeleteClick, id) => {
  return (
    <div className="dropdown-menu">
      <a className="dropdown-item" href="#"
        onClick={
          (e) => {
            e.preventDefault();
            if (confirm("Are you sure? This can't be undone")) onDeleteClick();
          }
        }
      >Delete Product</a>
    <Link className="dropdown-item" to={`/products/edit/${id}`}>Edit Product</Link>
      <a className="dropdown-item" href="#"
      onClick={
        (e) => {
          e.preventDefault();

        }
      }
      >Add Picture</a>
    </div>
  );
}

export default ProdsShowDropdown;
