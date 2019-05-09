/* eslint-env jest */
import React from 'react'
import { render, fireEvent, newStore, wait } from '../test-utils'
import ProdsAdd from 'components/prods_add'
import * as prodsActionMock from 'actions/prods'

jest.mock('actions/prods')
const store = newStore()

// check render of existing contents and attempt to add existing ingredient
test('existing content', async () => {
  const { getByText, getByTestId, queryByTestId } = render(
    <ProdsAdd
      match={{
        params: { id: 'a' },
        isExact: true,
        path: 'products',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  // check render existing content
  expect(getByText('content 1')).toBeTruthy()
  // check that a parent cannot be its own child
  // load the product ingredient list with legit search result
  fireEvent.change(getByTestId('searchInput'), { target: { value: '2' } })
  fireEvent.click(getByTestId('Search'))
  await wait(() => expect(queryByTestId('sku').textContent).toBe('2'))
  // search for the parent product - should not see in results
  fireEvent.change(getByTestId('searchInput'), { target: { value: '1' } })
  fireEvent.click(getByTestId('Search'))
  await wait(() => expect(queryByTestId('sku')).toBeNull())
})

test('add and remove content', async () => {
  const { getByText, getByTestId, queryByTestId, queryByText } = render(
    <ProdsAdd
      match={{
        params: { id: 'a' },
        isExact: true,
        path: 'products',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  // add the new content
  fireEvent.change(getByTestId('searchInput'), { target: { value: '2' } })
  fireEvent.click(getByTestId('Search'))
  await wait(() => expect(queryByTestId('sku').textContent).toBe('2'))
  fireEvent.click(getByText('Add'))
  await wait(() => expect(queryByTestId('sku')).toBeNull())
  expect(getByText('test2')).toBeTruthy()
  // delete the first ingredient
  fireEvent.click(getByText('Delete'))
  await wait(() => expect(queryByText('content 1')).toBeNull())
  expect(getByText('test2')).toBeTruthy()
})
