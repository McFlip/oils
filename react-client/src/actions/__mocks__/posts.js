/* eslint-env jest */
import { FETCH_POST, CREATE_POST, DELETE_POST, testState } from 'constants/'

const { prods: { a: { posts } } } = testState

export const fetchPost = jest.fn(() => {
  return {
    type: FETCH_POST,
    payload: posts[0]
  }
})

export const createPost = jest.fn(() => {
  return {
    type: CREATE_POST,
    payload: 'post created'
  }
})

export const deletePost = jest.fn(() => {
  return {
    type: DELETE_POST,
    payload: 'post deleted'
  }
})
