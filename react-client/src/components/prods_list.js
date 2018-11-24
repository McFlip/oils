import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProds } from "../actions/prods";
import { updateProd } from '../actions/prods';
import Checkbox from './checkbox';
import QTY_Button from './qty_button';
import QTY_Form from './qty_form';

class ProdsList extends Component {
  constructor(props){
    super(props);
    this.category = '';
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
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

  handleClick(_id, qty){
    this.setState({...this.state, sel_prod: {_id, qty}});
  }

  handleClose(){
    this.setState({sel_prod: null});
    console.log('closing');
  }

  handleSubmit(id, value){
    this.props.updateProd(id, value);
    this.handleClose();

  }

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
          <QTY_Button qty={prod.qty} _id={prod._id} handleClick={this.handleClick} />
          <Checkbox _id={prod._id} checked={prod.wishlist} />
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <QTY_Form
          close={this.handleClose}
          value={this.state.sel_prod? this.state.sel_prod.qty : 0}
          _id={this.state.sel_prod? this.state.sel_prod._id : 0}
          close={this.handleClose}
          handleSubmit={this.handleSubmit}
        />
        <ul className="list-group">
          {this.renderProds()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({prods}) {
  return { prods };
}

export default connect(mapStateToProps, { fetchProds, updateProd })(ProdsList);
