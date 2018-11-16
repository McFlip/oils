import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "./menu";

class RecipesIndex extends Component {
  render(){
    return(
      <div>
        <Menu page='recipes' />
        Recipe Page
      </div>
    );
  }
}

export default RecipesIndex;
