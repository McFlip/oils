/* eslint-env jest */
import _ from 'lodash'
import { FETCH_RECIPE } from 'constants/'
import { testState, testContains } from './testData'

const { recipes } = testState

export const fetchRecipe = jest.fn(() => {
  return {
    type: FETCH_RECIPE,
    payload: { data: recipes.testRecipe }
  }
})
export const updateRecipe = jest.fn((id, values) => {
  let recipe = _.assignIn(recipes[id], values)
  if (values.ingredients) {
    recipe.ingredients.map(i => {
      const id = String(i.product)
      i.product = _(testContains).pick(id).values().value()[0]
    })
  }
  return new Promise(resolve => resolve({
    type: FETCH_RECIPE,
    payload: { data: recipe }
  }))
})
