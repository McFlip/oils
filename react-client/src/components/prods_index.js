import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProds } from "../actions/prods";

class ProdsIndex extends Component {
  componentDidMount() {
    this.props.fetchProds();
  }

  renderProds() {
    return _.map(this.props.prods, prod => {
      return (
        <li className="list-group-item" key={prod.sku}>
          <span>
          {prod.sku}
          </span>
          <span className="invItem">
            <Link to={`/products/${prod._id}`}>
              {prod.descr}
            </Link>
          </span>
          <span className="invItem">
            {prod.size}
          </span>
          <span className="invItem">
            QTY: {prod.qty}
          </span>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            New Inventory Item
          </Link>
        </div>
        <h3>Inventory</h3>
        <ul className="list-group">
          {this.renderProds()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { prods: state.prods };
}

export default connect(mapStateToProps, { fetchProds })(ProdsIndex);
