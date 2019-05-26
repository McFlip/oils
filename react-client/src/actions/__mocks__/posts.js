/* eslint-env jest */
import { FETCH_POST, CREATE_POST, DELETE_POST } from 'constants/'
import { testState } from './testData'

const { prods: { a: { posts } } } = testState

export const fetchPost = jest.fn(() => {
  return {
    type: FETCH_POST,
    payload: { data: posts[0] }
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

export const updatePost = jest.fn(() => {
  return {
    type: CREATE_POST,
    payload: 'post created'
  }
})
