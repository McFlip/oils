import React, { Component } from 'react'
import { Form, Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions/posts'
import FieldFileInput from './posts_imgField'
import _ from 'lodash'

class PostsNew extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      file: ''
    }
  }
  renderField (field) {
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className='form-control' type='text' {...field.input} />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit (values, event) {
    console.log(event)
    const { id } = this.props.match.params
    const formData = new FormData()
    formData.append('image', this.state.file)
    _.map(values, (v, k) => formData.append(k, v))
    for (var value of formData.values()) {
      console.log(value); 
   }
    this.props.createPost(formData, () => {
      this.props.history.push(`/products/${id}`)
    })
  }

  onChange (file) {
    // load a preview
    console.log(file)
    // this.setState({ file })
  }

  render () {
    const { handleSubmit } = this.props
    const { id } = this.props.match.params

    return (
      <Form
        onSubmit={this.onSubmit}
        encType='multipart/form-data'
      >
        <Field
          label='Title For Post'
          name='title'
          component={this.renderField}
        />
        <Field
          label='Image'
          name='image'
          component={() => <FieldFileInput onChange={this.onChange} />}
        />
        <Field
          label='Post Content'
          name='content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to={`/products/${id}`} className='btn btn-danger'>Cancel</Link>
      </Form>
    )
  }
}

function validate (values) {
  const errors = {}

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = 'Enter a title'
  }
  if (!values.content) {
    errors.content = 'Enter some content please'
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(connect(null, { createPost })(PostsNew))
