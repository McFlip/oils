import _ from 'lodash'
import { ADD_USE, FETCH_USES, SEARCH_USES, testUses } from 'constants/'

// const testProd = testState.prods;
// const testProd2 = testState2.prods; // has 2 prods

export const createUse = jest.fn(() => {
  return {
    type: ADD_USE,
    payload: {
      data: {
        category: 'product',
        refId: 'createdUseId',
        title: 'createdUseTitle'
      }
    }
  }
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
