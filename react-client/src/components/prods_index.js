import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProds, updateProd, searchProds } from "../actions/prods";
import ProdsList from "./prods_list";
import Menu from "./menu";
import ProdsDropdown from "./prods_dropdown";
import SearchBar from "./search_bar";

class ProdsIndex extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleListAll = this.handleListAll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleListAll(){
    this.props.fetchProds();
  }

  handleSearch(category, term){
    this.props.searchProds(category, term);
  }

  handleSubmit(id, value){
    this.props.updateProd(id, value);
  }

  render() {
    return (
      <div>
        <Menu page="products" dropdown={ProdsDropdown(this.handleListAll)} />
        <h2>Inventory</h2>
        <SearchBar onSearchSubmit={this.handleSearch} />
        <ProdsList prods={this.props.prods} updateProd={this.handleSubmit} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { prods: state.prods };
}

export default connect(mapStateToProps, { fetchProds, updateProd, searchProds })(ProdsIndex);
