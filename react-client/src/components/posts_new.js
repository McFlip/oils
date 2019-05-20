import React, { Component } from 'react'
import { Form, Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost, fetchPost, updatePost } from '../actions/posts'
import FieldFileInput from './posts_imgField'
import Menu from './menu'
import { IMG_HOST } from '../constants'

class PostsNew extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.file = null
    this.state = { deleteImg: false }
  }

  componentDidMount () {
    const { id, postId } = this.props.match.params
    if (postId) this.props.fetchPost(id, postId)
  }

  renderField (field) {
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        {
          field.input.name === 'title'
            ? <input className='form-control' type='text' {...field.input} />
            : <textarea className='form-control' {...field.input} />
        }
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit (event) {
    event.preventDefault()
    const { id, postId } = this.props.match.params
    const formData = new FormData(event.target)
    formData.append('id', id)
    formData.append('postId', postId)
    formData.append('image', this.file)
    formData.append('deleteImg', this.state.deleteImg)
    if (postId) {
      this.props.updatePost(formData, () => {
        this.props.history.push(`/products/${id}`)
      })
    } else {
      this.props.createPost(formData, () => {
        this.props.history.push(`/products/${id}`)
      })
    }
  }
  // handle file selection
  onChange (file) {
    // TODO: load a preview
    // console.log(file)
    this.file = file
  }
  // show existing image in edit mode
  renderImg (img) {
    if (!img) return null
    return (
      <div className='card'>
        <h3>Existing Image</h3>
        <p>click delete to remove the image or select a new image to replace it</p>
        <button className='btn btn-danger' onClick={this.onDelete}>{this.state.deleteImg ? 'Keep Image' : 'Delete'}</button>
        <img src={IMG_HOST + img} style={this.state.deleteImg ? { filter: 'grayscale(100%)' } : {}} />
      </div>
    )
  }

  onDelete (e) {
    e.preventDefault()
    // TODO: mark the image for deletion
    this.setState({ deleteImg: !this.state.deleteImg })
  }

  render () {
    const { id } = this.props.match.params

    return (
      <div>
        <Menu page='products' />
        <Form
          onSubmit={this.onSubmit}
          encType='multipart/form-data'
        >
          <Field
            label='Title For Post'
            name='title'
            component={this.renderField}
          />
          { this.props.initialValues ? this.renderImg(this.props.initialValues.image) : null }
          <Field
            label='Image'
            name='image'
            component={(field) => <FieldFileInput label={field.label} onChange={this.onChange} />}
          />
          <Field
            label='Post Content'
            name='content'
            component={this.renderField}
          />
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to={`/products/${id}`} className='btn btn-danger'>Cancel</Link>
        </Form>
      </div>
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

function mapStateToProps ({ posts: { post } }, ownProps) {
  // console.log(post)
  if (ownProps.match.params.postId) {
    return { initialValues: post }
  } else {
    return {}    
  }
}

let myForm = reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew)

export default connect(mapStateToProps, { createPost, fetchPost, updatePost })(myForm)
