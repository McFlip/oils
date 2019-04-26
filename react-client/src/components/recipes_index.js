import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "./menu";
import SearchBar from './search_bar';
import CreateRecipe from "./create";
import { searchRecipes, createRecipe } from "../actions/recipes";

class RecipesIndex extends Component {
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = { recipes: [] }
  }
  handleSearch(term){
    searchRecipes(term).then(q => this.setState({recipes: q.data}));
  }
  handleCreate(title){
    // jump to newly created recipe
    createRecipe({title}, recipe => console.log(recipe));
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
        <CreateRecipe onCreateSubmit={this.handleCreate} />
        <p>Click Search without search term to list all available recipes</p>
        <SearchBar onSearchSubmit={this.handleSearch} subject="uses" />
        <h2>Recipes Found</h2>
        <ul className="list-group">{this.renderRecipes(this.state.recipes)}</ul>
      </div>
    );
  }
}

export default RecipesIndex;
