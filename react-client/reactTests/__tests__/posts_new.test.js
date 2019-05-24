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
  // test submit
  // TODO: use testid - getbylabeltext not working
  fireEvent.change(getByLabelText('Title For Post'), { target: { value: 'test title' } })
  fireEvent.change(getByLabelText('Post Content'), { target: { value: 'test content' } })
  fireEvent.click(getByText('Submit'))
  expect(postsActionMock.createPost).toBeCalledWith('test title')
})
