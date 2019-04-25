import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "./menu";
import SearchBar from './search_bar';
import { searchRecipes } from "../actions/recipes";

class RecipesIndex extends Component {
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = { recipes: [] }
  }
  handleSearch(term){
    searchRecipes(term).then(q => this.setState({recipes: q.data}));
  }
  renderRecipes(recipes){
    if(!recipes) return null;
    return recipes.map((r, i) => {
        return(
          <Link to={`/recipes/${r._id}`} key={i} className="list-group-item list-group-item-action">{r.title}</Link>
        )
      });
  }
  render(){
    return(
      <div>
        <Menu page='recipes' />
        <p>Click Search without search term to list all available recipes</p>
        <SearchBar onSearchSubmit={this.handleSearch} subject="uses" />
        <h2>Recipes Found</h2>
        <ul className="list-group">{this.renderRecipes(this.state.recipes)}</ul>
      </div>
    );
  }
}

export default RecipesIndex;
