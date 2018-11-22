import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProd } from '../actions/prods';

class QTY_Form extends Component {
  constructor(props){
    super(props);
    this.state = {value: this.props.value};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // controlled component
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // dispatch actions
  handleSubmit(event) {
    event.preventDefault();
    alert('Set qty to: ' + this.state.value);
    //this.props.updateProd(this.props._id, this.state.value);
  }

  render(){
    return(
      <div className="modal fade" id="qtyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={this.handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body form-group">
                <label htmlFor="qtyInput"> QTY: </label>
                <input type="number" className="form-control" id="qtyInput" value={this.state.value} onChange={this.handleChange} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.close}>Close</button>
                <button type="submit" className="btn btn-primary" data-dismiss="modal">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
/*
function mapStateToProps(state, ownProps) {
  return { value: state.prods[ownProps._id].qty };
}

export default connect(mapStateToProps, { updateProd })(QTY_Form);
*/
export default QTY_Form;
