import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost, deletePost } from '../actions/posts'

class PostsShow extends Component {
  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchPost(id)
  }

  onDeleteClick () {
    const { id } = this.props.match.params

    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }

  render () {
    const { post } = this.props

    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to='/'>Back To Index</Link>
        <button
          className='btn btn-danger pull-xs-right'
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

PostsShow.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  fetchPost: PropTypes.func,
  deletePost: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  post: PropTypes.object
}

function mapStateToProps ({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)
