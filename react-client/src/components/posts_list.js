import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IMG_HOST } from '../constants'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import marked from 'marked'

class PostList extends Component {
  renderPosts () {
    const { id } = this.props
    return this.props.posts.map((post, i) => {
      const clean = DOMPurify.sanitize(post.content)
      const md = marked(clean)
      return (
        <div className='card' key={i}>
          <div className='alert alert-yl'>
            {post.title}
            <Link className='btn float-right' to={`/products/${id}/editpost/${post._id}`}>...</Link>
          </div>
          {post.image && <img className='' alt='posted image' src={IMG_HOST + post.image} />}
          <div className='card-body'>
            <div className='card-text' dangerouslySetInnerHTML={{ __html: md }} />
          </div>
        </div>
      )
    })
  }
  render () {
    return (
      <div className='card'>
        <h4>Posts:</h4>
        <div>
          {this.props.posts && this.renderPosts()}
        </div>
      </div>
    )
  }
}

PostList.propTypes = {
  id: PropTypes.string,
  posts: PropTypes.array
}

export default PostList
