import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProds } from "../actions/prods";

class ProdsList extends Component {
  componentDidMount() {
    this.props.fetchProds();
  }

  renderProds() {
    return _.map(this.props.prods, prod => {
      return (
        <li className="list-group-item" key={prod.sku}>
          <span data-testid='sku'>
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
        <ol className="list-group">
          {this.renderProds()}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { prods: state.prods };
}

export default connect(mapStateToProps, { fetchProds })(ProdsList);
