import _ from 'lodash'
import { FETCH_PRODS, FETCH_PROD, DELETE_PROD, testState, testState2 } from 'constants/'

const testProd = testState.prods
const testProd2 = testState2.prods // has 2 prods

export const fetchProds = jest.fn(() => {
  return {
    type: FETCH_PRODS,
    payload: { data: [testProd.a] }
  }
})

export const fetchProd = jest.fn(() => {
  return {
    type: FETCH_PROD,
    payload: { data: testProd.a }
  }
})

export const createProd = jest.fn((values, callback) => {
  const testid = { _id: 'testid' }
  if (values.oil) {
    const { photosensitive, topical, dilute, aromatic, dietary } = values
    values.oil = { photosensitive, topical, dilute, aromatic, dietary }
  }
  callback(testid)
  return {
    type: FETCH_PROD,
    payload: { data: { ...values, ...testid } }
  }
})

export const searchProds = jest.fn((term, category) => {
  let request
  // cast to int
  if (!isNaN(term)) {
    term = parseInt(term)
  }
  // filter wishlist test has 2 prods
  // cast to boolean
  if (category == 'wishlist') {
    term = (term == 'true')
    request = _.find(testProd2, { [category]: term })
  } else {
    request = _.find(testProd, { [category]: term })
  }
  let result = []
  if (request) {
    result = [request]
  }
  return {
    type: FETCH_PRODS,
    payload: { data: result }
  }
})

export const updateProd = jest.fn((id, values) => {
  return new Promise(resolve => resolve({
    type: FETCH_PROD,
    payload: { data: _.assignIn(testProd[id], values) }
  }))
})

export const deleteProd = jest.fn((_id) => {
  let request
  request = _.find(testProd2, { _id })
  const result = request || {}
  return Promise.resolve({
    type: DELETE_PROD,
    payload: { data: result }
  })
})
