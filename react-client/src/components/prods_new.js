import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createProd, fetchProd, updateProd } from '../actions/prods'
import Menu from './menu'

class ProdsNew extends Component {
  constructor (props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.renderField = this.renderField.bind(this)
  }

  componentDidMount () {
    const { id } = this.props.match.params

    if (id) {
      this.props.fetchProd(id)
    }
  }

  renderField (field) {
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`

    return (
      <div className={className}>
        <label htmlFor={field.testid} >{field.label}</label>
        <input className='form-control'
          id={field.testid}
          data-testid={field.testid}
          type={field.type}
          {...field.input}
        />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  renderCB (field) {
    return (
      <div className='form-check'>
        <input
          className='form-check-input'
          type='checkbox'
          id={field.testid}
          data-testid={field.testid}
          {...field.input}
          checked={field.input.value}
        />
        <label className='form-check-label' htmlFor={field.testid} >{field.label}</label>
      </div>
    )
  }

  onSubmit (values) {
    const { id } = this.props.match.params
    if (id) {
      if (values.oil) {
        const { photosensitive, topical, dilute, aromatic, dietary } = values
        values.oil = { photosensitive, topical, dilute, aromatic, dietary }
      }
      this.props.updateProd(id, values)
        .then(() => this.props.history.push(`/products/${id}`))
    } else {
      this.props.createProd(values, ({ _id }) => {
        this.props.history.push({
          pathname: `/products/${_id}`,
          state: { referer: 'ProdsNew' }
        })
      })
    }
  }

  render () {
    const { handleSubmit, isOil } = this.props
    const { id } = this.props.match.params
    const oilProps = ['photosensitive', 'topical', 'dilute', 'aromatic', 'dietary']
    return (
      <div>
        <Menu page='products' />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
          <Field
            label='Item Number'
            name='sku'
            testid='sku'
            component={this.renderField}
            type='number'
          />
          <Field
            label='Description'
            name='descr'
            testid='descr'
            component={this.renderField}
            type='text'
            required
          />
          <Field
            label='Size'
            name='size'
            testid='size'
            component={this.renderField}
          />
          <Field
            label='Category'
            name='category'
            testid='category'
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
              {oilProps.map((i) => <Field key={i} label={i} name={i} testid={i} component={this.renderCB} />)}
            </div>
          )}
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to={id ? `/products/${id}` : '/products'} className='btn btn-danger'>Cancel</Link>
        </form>
      </div>
    )
  }
}
ProdsNew.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ])
    })
  }),
  fetchProd: PropTypes.func,
  updateProd: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  createProd: PropTypes.func,
  handleSubmit: PropTypes.func,
  isOil: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
}
function validate (values) {
  const errors = {}
  // Validate the inputs from 'values'
  if (!values.descr) {
    errors.descr = 'Description is required'
  }
  return errors
}

function mapStateToProps (state, ownProps) {
  const selector = formValueSelector('ProdsNewForm')
  let IV = state.prods[ownProps.match.params.id]
  if (IV) {
    if (IV.oil) {
      const oilprops = IV.oil
      IV = { ...IV, ...oilprops }
      IV.oil = true
      delete IV._id
    }
  }
  return {
    isOil: selector(state, 'oil'),
    initialValues: IV
  }
}

const ProdsNewForm = reduxForm({
  validate,
  form: 'ProdsNewForm'
})(ProdsNew)

export default connect(mapStateToProps, { createProd, fetchProd, updateProd })(ProdsNewForm)
