//import _ from "lodash";
import React, { Component } from "react";
//import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import { fetchProds } from "../actions/prods";
import ProdsList from "./prods_list";
import Menu from "./menu";

class ProdsIndex extends Component {
  /*componentDidMount() {
    this.props.fetchProds();
  }*/

  render() {
    return (
      <div>
        <Menu page="products" />
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            New Inventory Item
          </Link>
        </div>
        <h3>Inventory</h3>
        <ProdsList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { prods: state.prods };
}

//export default connect(mapStateToProps, { fetchProds })(ProdsIndex);
export default ProdsIndex;
