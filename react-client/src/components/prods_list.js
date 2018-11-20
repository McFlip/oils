import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProds } from "../actions/prods";
import Checkbox from './checkbox';

class ProdsList extends Component {
  constructor(props){
    super(props);
    this.category = '';
  }

  componentDidMount() {
    this.props.fetchProds();
  }

  categorize(cat){
    // check cat and output header
    if(this.category != cat){
      this.category = cat;
      return(<div><h4>{cat}</h4><hr /></div>);
    }
    return null;
  }


  // TODO: replace checkbox with component
  // TODO: create qty modal form and wire to qty button
  renderProds() {
    this.category = '';
    return _.map(this.props.prods, prod => {
      return (
        <li className="list-group-item input-group" key={prod._id}>
          {this.categorize(prod.category)}
          <span data-testid='sku'>
            {prod.sku}
          </span>
          <span className="px-2">
            <Link to={`/products/${prod._id}`}>
              {prod.descr}
            </Link>
          </span>
          <span className="px-2">
            {prod.size}
          </span>
          <button type="button" className="btn btn-primary px-2" onClick={()=> alert('Modal w/ ch qty form')} >
            QTY:
            <span className='badge badge-light'>
              {prod.qty}
            </span>
          </button>
          <Checkbox _id={prod._id} checked={prod.wishlist} />
        </li>
      );
    });
  }

  render() {
    return (
      <div>
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

export default connect(mapStateToProps, { fetchProds })(ProdsList);
