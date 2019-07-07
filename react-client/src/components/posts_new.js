import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost, fetchPost, updatePost, deletePost } from '../actions/posts'
import FieldFileInput from './posts_imgField'
import Menu from './menu'
import { IMG_HOST } from '../constants'

class PostsNew extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.onDeleteImg = this.onDeleteImg.bind(this)
    this.onDeletePost = this.onDeletePost.bind(this)
    this.file = null
    this.state = { deleteImg: false }
  }

  componentDidMount () {
    const { id, postId } = this.props.match.params
    if (postId) this.props.fetchPost(id, postId)
  }

  renderField (field) {
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`
    return (
      <div className={className}>
        <label htmlFor={field.id} >{field.label}</label>
        {
          field.input.name === 'title'
            ? <input id={field.id} className='form-control' type='text' required {...field.input} />
            : <textarea id={field.id} className='form-control' {...field.input} />
        }
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit (event) {
    /* global FormData */
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
    this.file = file
  }
  // show existing image in edit mode
  renderImg (img) {
    if (!img) return null
    return (
      <div className='card'>
        <h3>Existing Image</h3>
        <p>click delete to remove the image or select a new image to replace it</p>
        <button className='btn btn-danger' onClick={this.onDeleteImg}>{this.state.deleteImg ? 'Keep Image' : 'Delete'}</button>
        <img src={IMG_HOST + img} alt='post image' className='post-edit-img' style={this.state.deleteImg ? { filter: 'grayscale(100%) blur(5px)' } : {}} />
      </div>
    )
  }
  // Delete a post image
  onDeleteImg (e) {
    e.preventDefault()
    this.setState({ deleteImg: !this.state.deleteImg })
  }
  // Delete the entire post
  onDeletePost (e) {
    const { id, postId } = this.props.match.params
    e.preventDefault()
    if (window.confirm('Are you sure? This cannot be undone!')) {
      this.props.deletePost(id, postId, () => {
        this.props.history.push(`/products/${id}`)
      })
    }
  }
  render () {
    const { id, postId } = this.props.match.params

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
            id='title'
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
            id='content'
            component={this.renderField}
          />
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to={`/products/${id}`} className='btn btn-secondary'>Cancel</Link>
          {postId ? <button onClick={this.onDeletePost} className='btn btn-danger float-right'>Delete Post</button> : null}
        </Form>
      </div>
    )
  }
}

PostsNew.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  fetchPost: PropTypes.func,
  updatePost: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  createPost: PropTypes.func,
  deletePost: PropTypes.func,
  initialValues: PropTypes.object
}

function validate (values) {
  const errors = {}

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = 'Enter a title'
  }
  return errors
}

function mapStateToProps ({ posts: { post } }, ownProps) {
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

export default connect(mapStateToProps, { createPost, fetchPost, updatePost, deletePost })(myForm)
