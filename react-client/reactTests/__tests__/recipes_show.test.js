/* eslint-env jest */
import React from 'react'
import { render, newStore } from '../test-utils'
import RecipesShow from 'components/recipes_show'

jest.mock('actions/recipes')
const store = newStore()

test('recipe render', () =>{
  const recipe = render(
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
  expect(recipe).toMatchSnapshot()
})
