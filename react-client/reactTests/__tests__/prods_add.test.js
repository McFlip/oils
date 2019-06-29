/* eslint-env jest */
import React from 'react'
import { render, fireEvent, newStore, wait } from '../test-utils'
import ProdsAdd from 'components/prods_add'
import * as recipesActionMock from 'actions/recipes'

jest.mock('actions/prods')
jest.mock('actions/recipes')
jest.mock('jquery', () => {
  return function () {
    return { toast: () => {} }
  }
})
const store = newStore()

// kit tests
// check render of existing contents and attempt to add existing ingredient
test('existing kit content', async () => {
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

// recipe tests
// check render existing ingredients
test('existing recipe ingredients', () => {
  const store = newStore()
  const { getByText } = render(
    <ProdsAdd
      match={{
        params: { id: 'testRecipe' },
        isExact: true,
        path: 'recipes',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  expect(getByText('test prod ingredient')).toBeTruthy()
  expect(getByText('Change')).toBeTruthy()
})
// check changing qty
test('ingredient qty', () => {
  const store = newStore()
  const { getByText, getByTestId } = render(
    <ProdsAdd
      match={{
        params: { id: 'testRecipe' },
        isExact: true,
        path: 'recipes',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  // click change without actually changing qty - nothing happens
  fireEvent.click(getByText('Change'))
  expect(getByTestId('qty').value).toBe('1 drop')
  expect(recipesActionMock.updateRecipe).toHaveBeenCalledTimes(0)
  // change the qty
  fireEvent.change(getByTestId('qty'), { target: { value: 'new quantity' } })
  fireEvent.click(getByText('Change'))
  expect(getByTestId('qty').value).toBe('new quantity')
})
test('add and delete ingredient', async () => {
  const store = newStore()
  const { getByText, getByTestId, queryByText, queryByTestId } = render(
    <ProdsAdd
      match={{
        params: { id: 'testRecipe' },
        isExact: true,
        path: 'recipes',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  // delete the existing ingredient
  fireEvent.click(getByText('Delete'))
  await wait(() => expect(queryByText('test prod ingredient')).toBeNull())
  // add a new ingredient
  fireEvent.change(getByTestId('searchInput'), { target: { value: '2' } })
  fireEvent.click(getByTestId('Search'))
  await wait(() => expect(getByTestId('sku').textContent).toBe('2'))
  // click the add button without setting qty - nothing should happen
  fireEvent.click(getByText('Add'))
  expect(recipesActionMock.updateRecipe).toHaveBeenCalledTimes(2)
  expect(queryByTestId('prod')).toBeNull()
  // set a qty and add
  fireEvent.change(getByTestId('qty'), { target: { value: 'new ingredient test' } })
  fireEvent.click(getByText('Add'))
  await wait(() => expect(getByTestId('prod').textContent).toBe('test2'))
})
