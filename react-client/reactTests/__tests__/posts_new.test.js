/* eslint-env jest */
import React from 'react'
import { render, newStore, fireEvent } from '../test-utils'
import PostsNew from 'components/posts_new'
import * as postsActionMock from 'actions/posts'

jest.mock('actions/posts')
const store = newStore()

// create post tests
test('render new post', () => {
  const newPost = render(
    <PostsNew
      match={{
        params: { id: 'a' },
        isExact: true,
        path: '',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  expect(newPost).toMatchSnapshot()
})

test('create new post', () => {
  const { getByText, getByLabelText } = render(
    <PostsNew
      match={{
        params: { id: 'a' },
        isExact: true,
        path: '',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  // test valid submit
  // relying on HTML5 required prop for this form
  // uploading an image will be covered in end to end tests
  fireEvent.change(getByLabelText('Title For Post'), { target: { value: 'test title' } })
  fireEvent.change(getByLabelText('Post Content'), { target: { value: 'test content' } })
  fireEvent.click(getByText('Submit'))
  expect(postsActionMock.createPost).toHaveBeenCalledTimes(1)
  const formData = postsActionMock.createPost.mock.calls[0][0]
  expect(formData.get('title')).toBe('test title')
  expect(formData.get('content')).toBe('test content')
  expect(formData.get('image')).toBe('null')
})

// edit post tests
test('render edit post', () => {
  const editPost = render(
    <PostsNew
      match={{
        params: { id: 'a', postId: 'postId' },
        isExact: true,
        path: '',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  const { getByLabelText } = editPost
  expect(postsActionMock.fetchPost).toHaveBeenCalledTimes(1)
  expect(getByLabelText(/title/i).value).toBe('postTitle')
  expect(getByLabelText(/content/i).value).toBe('postContent')
  expect(editPost).toMatchSnapshot()
})

test('edit post', /* async */ () => {
  const store = newStore()
  const { getByText, getByAltText } = render(
    <PostsNew
      match={{
        params: { id: 'a', postId: 'postId' },
        isExact: true,
        path: '',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  // test valid submit keeping post as is - no changes
  fireEvent.click(getByText('Submit'))
  // createPost was called in previous test
  expect(postsActionMock.createPost).toHaveBeenCalledTimes(1)
  expect(postsActionMock.updatePost).toHaveBeenCalledTimes(1)
  let formData = postsActionMock.updatePost.mock.calls[0][0]
  expect(formData.get('title')).toBe('postTitle')
  expect(formData.get('content')).toBe('postContent')
  expect(formData.get('image')).toBe('null')
  expect(formData.get('deleteImg')).toBe('false')
  // test deleting the image
  fireEvent.click(getByText('Delete'))
  fireEvent.click(getByText('Submit'))
  expect(postsActionMock.updatePost).toHaveBeenCalledTimes(2)
  formData = postsActionMock.updatePost.mock.calls[1][0]
  expect(formData.get('image')).toBe('null')
  expect(formData.get('deleteImg')).toBe('true')
  expect(getByAltText('post image').style._values).toEqual({ 'filter': 'grayscale(100%) blur(5px)' })
  // delete post
  fireEvent.click(getByText('Delete Post'))
  expect(postsActionMock.deletePost).toHaveBeenCalledTimes(1)
  expect(postsActionMock.deletePost.mock.calls[0][0]).toBe('a')
  expect(postsActionMock.deletePost.mock.calls[0][1]).toBe('postId')
})
