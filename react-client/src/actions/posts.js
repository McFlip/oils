import axios from 'axios'
import { FETCH_POSTS, FETCH_POST, CREATE_POST, DELETE_POST, ROOT_URL } from '../constants'

export function fetchPosts () {
  const request = axios.get(`${ROOT_URL}/posts`)

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function createPost (values, callback) {
  // console.log(values)
  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
  }
  const request = axios
    .post(`${ROOT_URL}/posts`, values, config)
    .then(() => callback())

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function updatePost (values, callback) {
  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
  }
  const request = axios
    .post(`${ROOT_URL}/posts/${values.get('postId')}`, values, config)
    .then(() => callback())

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function fetchPost (prodId, postId) {
  const request = axios.get(`${ROOT_URL}/products/${prodId}/posts/${postId}`)

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost (prodId, postId, callback) {
  const request = axios
    .delete(`${ROOT_URL}/products/${prodId}/posts/${postId}`)
    .then(() => callback())

  return {
    type: DELETE_POST,
    payload: request
  }
}
