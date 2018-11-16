//import _ from "lodash";
import React, { Component } from "react";
//import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import { fetchProds } from "../actions/prods";
import ProdsList from "./prods_list";
import Menu from "./menu";
import ProdsDropdown from "./prods_dropdown"

class ProdsIndex extends Component {
  /*componentDidMount() {
    this.props.fetchProds();
  }*/

  render() {
    return (
      <div>
        <Menu page="products" dropdown={ProdsDropdown} />
        <h3>Inventory</h3>
        <ProdsList />
      </div>
    );
  }
}

/*
function mapStateToProps(state) {
  return { prods: state.prods };
}
*/
//export default connect(mapStateToProps, { fetchProds })(ProdsIndex);
export default ProdsIndex;
