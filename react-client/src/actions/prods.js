import axios from 'axios'
import { FETCH_PRODS, FETCH_PROD, DELETE_PROD, ROOT_URL } from '../constants/'
const apiKey = 'badkitteh' // TODO: replace with env var
// const apiKey = process.env.API_KEY
// TODO: put apiKey in auth header
export function fetchProds () {
  const request = axios.get(`${ROOT_URL}/products?apikey=${apiKey}`)

  return {
    type: FETCH_PRODS,
    payload: request
  }
}

export function searchProds (term, category) {
  const request = axios.get(`${ROOT_URL}/products/search/${category}?q=${term}`)

  return {
    type: FETCH_PRODS,
    payload: request
  }
}

export function createProd (values, callback) {
  const request = axios
    .post(`${ROOT_URL}/products`, values)
    .then(product => {
      callback(product.data)
      return product
    })
  return {
    type: FETCH_PROD,
    payload: request
  }
}

export function fetchProd (id) {
  const request = axios.get(`${ROOT_URL}/products/${id}`)

  return {
    type: FETCH_PROD,
    payload: request
  }
}

export function deleteProd (id) {
  const request = axios
    .delete(`${ROOT_URL}/products/${id}`)

  return {
    type: DELETE_PROD,
    payload: request
  }
}

export function updateProd (id, values) {
  const request = axios
    .post(`${ROOT_URL}/products/${id}`, values)

  return {
    type: FETCH_PROD,
    payload: request
  }
}
