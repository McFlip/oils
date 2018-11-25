import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProds, updateProd } from "../actions/prods";
import ProdsList from "./prods_list";
import Menu from "./menu";
import ProdsDropdown from "./prods_dropdown"

class ProdsIndex extends Component {
  constructor(props){
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    //this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.state = {};
  }
  componentDidMount() {
    this.props.fetchProds();
  }

  handleSubmit(id, value){
    this.props.updateProd(id, value);
  }

  render() {
    return (
      <div>
        <Menu page="products" dropdown={ProdsDropdown} />
        <h2>Inventory</h2>
        <ProdsList prods={this.props.prods} updateProd={this.handleSubmit} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { prods: state.prods };
}

export default connect(mapStateToProps, { fetchProds, updateProd })(ProdsIndex);
//export default ProdsIndex;
