import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import Menu from "./menu";
import ProdsShowDropdown from "./prodsShow_dropdown";
import { fetchProd, deleteProd } from '../actions/prods';

class ProdsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchProd(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteProd(id, () => {
      this.props.history.push("/products");
    });
  }

  renderVal(wholesale, retail, pv){
    return(
      <table>
        <thead>
          <tr><th>wholesale</th><th>retail</th><th>PV</th></tr>
        </thead>
        <tbody>
          <tr><td>${wholesale ? wholesale : ''}</td><td>${retail ? retail : ''}</td><td>{pv ? pv : ''}</td></tr>
        </tbody>
      </table>
    );
  }

  renderOil(oilProps){
    return(
      <div className='form-group'>
        {Object.keys(oilProps).map((k)=> (
          <div className='form-check' key={k}>
            <input className='form-check-input' type='checkbox' id={k} checked={oilProps[k]?oilProps[k]:false} readOnly/>
            <label htmlFor={k}>{k}</label>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { prod, match } = this.props;

    if (!prod) {
      return <div>Loading...</div>;
    }else {
      const { descr, size, unit_issue, category, wholesale, retail, pv, oil } = prod;
      let oilProps = false;
      if (oil) {
        const { photosensitive, topical, dilute, aromatic, dietary } = oil;
        oilProps = { photosensitive, topical, dilute, aromatic, dietary };
      }

      return (
        <div>
          <Menu page='products' dropdown={ProdsShowDropdown(this.onDeleteClick.bind(this), match.params.id)} />
          <h3>{`${descr} ${size? size : ''} ${unit_issue? unit_issue : '' }`}</h3>
          <h6>Category: {category? category : ''}</h6>
          {wholesale || retail || pv ? this.renderVal(wholesale,retail,pv) : ''}
          {oil? this.renderOil(oilProps): ''}
        </div>
      );
    }
  }
}

function mapStateToProps({ prods }, ownProps) {
  return { prod: prods[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchProd, deleteProd })(ProdsShow);
