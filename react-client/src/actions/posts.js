import axios from 'axios'

export const FETCH_POSTS = 'fetch_posts'
export const FETCH_POST = 'fetch_post'
export const CREATE_POST = 'create_post'
export const DELETE_POST = 'delete_post'

const ROOT_URL = 'http://localhost:3000'

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
  /*
  return {
    type: 'fubar', payload: null
  }
  */
  
  const request = axios
    .post(`${ROOT_URL}/posts`, values, config)
    .then(() => callback())

  return {
    type: CREATE_POST,
    payload: request
  }

}

export function fetchPost (id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`)

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost (id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/posts/${id}`)
    .then(() => callback())

  return {
    type: DELETE_POST,
    payload: id
  }
}
