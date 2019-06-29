/* eslint-env jest */
import { ADD_USE, FETCH_USES, SEARCH_USES } from 'constants/'
import { testUses } from './testData'

export const createUse = jest.fn(() => {
  return new Promise(resolve => resolve({
    type: ADD_USE,
    payload: {
      data: {
        category: 'product',
        refId: 'createdUseId',
        title: 'createdUseTitle'
      }
    }
  }))
})

export const fetchUses = jest.fn(() => {
  return {
    type: FETCH_USES,
    payload: {
      data: testUses.slice(0, 2)
    }
  }
})

export const searchUses = jest.fn(() => {
  return {
    type: SEARCH_USES,
    payload: {
      data: testUses
    }
  }
})

export const addUse = jest.fn((id) => {
  return {
    type: ADD_USE,
    payload: { data: id }
  }
})
