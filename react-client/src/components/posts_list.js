import React, { Component } from 'react'
import { IMG_HOST } from '../constants';
import { Link } from 'react-router-dom'

class PostList extends Component {
  renderPosts () {
    const { id } = this.props
    return this.props.posts.map((post, i) => {
      return (
        <div className='card' key={i}>
          {post.image ? <img className='card-img-top' alt='posted image' src={IMG_HOST + post.image} /> : null}
          <div className='card-body'>
            <div className='card-header'>
              {post.title}
              <Link className='btn float-right' to={`/products/${id}/editpost/${post._id}`}>...</Link>
            </div>
            <div className='card-text'>
              {post.content}
            </div>
          </div>
        </div>
      )
    })
  }
  render () {
    return (
      <div>
        <h6>Posts:</h6>
        <div>
          {this.props.posts ? this.renderPosts() : null}
        </div>
      </div>
    )
  }
}
export default PostList
