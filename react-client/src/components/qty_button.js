import React, { Component } from "react";
import ReactDOM from 'react-dom';
import QTY_Form from './qty_form';

export default class QTY_Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  modal(_id, qty) {
    console.log('shizzle');
    ReactDOM.render(<QTY_Form _id={_id} value={qty} />,
      document.getElementById('modalMount'));
  }
  handleClick(){
    this.setState({sel_prod: {_id: this.props._id, qty: this.props.qty}});
  }
  handleClose(){
    this.setState({sel_prod: null});
    console.log('closing');
  }
  render(){
    return(
      <span>
      {this.state.sel_prod ? <QTY_Form _id={this.props._id} value={this.props.qty} close ={this.props.handleClose} /> : null}
      <button
        type="button"
        className="btn btn-primary px-2"
        data-toggle="modal"
        data-target="#qtyModal"
        onClick={this.handleClick}
      >
        QTY:
        <span className='badge badge-light'>
          {this.props.qty}
        </span>
      </button>
      </span>
    );
  }
}
