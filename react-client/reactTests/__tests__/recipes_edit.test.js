/* eslint-env jest */
import React from 'react'
import { render, newStore, fireEvent } from '../test-utils'
import RecipesShow from 'components/recipes_show'

jest.mock('actions/recipes')
jest.dontMock('jquery')
const store = newStore()

// the prods_add test covers editing ingredients
// the prod_add_use test covers uses
// recipes_show test covers rendering a recipe using a snapshot
// first test makes the changes
// then we rerender and make assertions
test('edit recipe', async () => {
  const { getByText, getByLabelText, getByTestId } = render(
    <RecipesShow
      match={{
        params: { id: 'testRecipe' },
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
  // edit the title
  fireEvent.click(getByText('Actions'))
  fireEvent.click(getByText('Edit Title'))
  fireEvent.change(getByLabelText('Title:'), { target: { value: 'testez recipez deez nuts' } })
  fireEvent.click(getByText('Save changes'))
  fireEvent.click(getByText('Actions'))
  fireEvent.click(getByText('Edit directions'))
  fireEvent.change(getByTestId('directions'), { target: { value: 'step 1 cut a hole in the box' } })
  fireEvent.click(getByTestId('dirSubmit'))
})
// rerender and make assertions
test('edit recipe WTF', () => {
  const { getByText, getByTestId } = render(
    <RecipesShow
      match={{
        params: { id: 'testRecipe' },
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
  expect(getByTestId('titleDisplay').textContent).toBe('testez recipez deez nuts')
  expect(getByText('step 1 cut a hole in the box')).toBeTruthy()
})
