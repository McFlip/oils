import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createProd } from "../actions/prods";
import Menu from "./menu";

class ProdsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderCB(field) {
    return (
      <div className='form-check'>
        <input className="form-check-input" type='checkbox' {...field.input} />
        <label className='form-check-label'>{field.label}</label>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
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
            component={this.renderField}
            type='text'
          />
          <Field
            label="Description"
            name="descr"
            component={this.renderField}
          />
          <Field
            label="Size"
            name="size"
            component={this.renderField}
          />
          <Field
            label="Category"
            name="category"
            component={this.renderField}
          />
          <Field
            label='Quantity'
            name='qty'
            component={this.renderField}
            type='number'
          />
          <Field
            label='Wholesale'
            name='wholesale'
            component={this.renderField}
            type='number'
          />
          <Field
            label='Retail'
            name='retail'
            component={this.renderField}
            type='number'
          />
          <Field
            label='PV'
            name='pv'
            component={this.renderField}
            type='number'
          />
          <Field
            label='Add to wishlist'
            name='wishlist'
            component={this.renderCB}
          />
          <Field
            label='Individual oil'
            name='oil'
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

const selector = formValueSelector('ProdsNewForm');

export default reduxForm({
  validate,
  form: "ProdsNewForm"
})(connect(state => ({isOil: selector(state, 'oil')}), { createProd })(ProdsNew));
