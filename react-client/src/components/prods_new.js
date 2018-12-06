import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createProd, fetchProd } from "../actions/prods";
import Menu from "./menu";

class ProdsNew extends Component {
  constructor(props){
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this)
    this.renderField = this.renderField.bind(this)
  }

  componentDidMount(){
    const { id } = this.props.match.params;

    if (id) {
      this.props.fetchProd(id);
    }
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          data-testid={field.testid}
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderCB(field) {
    return (
      <div className='form-check'>
        <input
          className="form-check-input"
          type='checkbox'
          data-testid={field.testid}
          {...field.input}
        />
        <label className='form-check-label'>{field.label}</label>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createProd(values, () => {
      // TODO: go to the view product page
      this.props.history.push("/products");
    });
  }

  render() {
    const { handleSubmit, isOil } = this.props;

    return (
      <div>
        <Menu page='products' />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Item Number"
            name="sku"
            testid='sku'
            component={this.renderField}
            type='number'
          />
          <Field
            label="Description"
            name="descr"
            testid="descr"
            component={this.renderField}
            type='text'
          />
          <Field
            label="Size"
            name="size"
            testid="size"
            component={this.renderField}
          />
          <Field
            label="Category"
            name="category"
            testid="category"
            component={this.renderField}
          />
          <Field
            label='Quantity'
            name='qty'
            testid='qty'
            component={this.renderField}
            type='number'
          />
          <Field
            label='Wholesale'
            name='wholesale'
            testid='wholesale'
            component={this.renderField}
            type='number'
          />
          <Field
            label='Retail'
            name='retail'
            testid='retail'
            component={this.renderField}
            type='number'
          />
          <Field
            label='PV'
            name='pv'
            testid='pv'
            component={this.renderField}
            type='number'
          />
          <Field
            label='Add to wishlist'
            name='wishlist'
            testid='wishlist'
            component={this.renderCB}
          />
          <Field
            label='Individual oil'
            name='oil'
            testid='oil'
            component={this.renderCB}
          />
          {isOil && (
            <div>
              <Field
                label='photosensitive'
                name='photosensitive'
                component={this.renderCB}
              />
              <Field
                label='topical'
                name='topical'
                component={this.renderCB}
              />
              <Field
                label='dilute'
                name='dilute'
                component={this.renderCB}
              />
              <Field
                label='aromatic'
                name='aromatic'
                component={this.renderCB}
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/products" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.descr) {
    errors.descr = "Description is required";
  }
  return errors;
}

function mapStateToProps(state, ownProps) {
  const selector = formValueSelector('ProdsNewForm');
  return {
    isOil: selector(state, 'oil'),
    initialValues: state.prods[ownProps.match.params.id]
    };
}

ProdsNew = reduxForm({
  validate,
  form: "ProdsNewForm"
})(ProdsNew)

export default connect(mapStateToProps, { createProd, fetchProd })(ProdsNew);
