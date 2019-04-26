import axios from 'axios'
import { FETCH_USES, FETCH_USE, SEARCH_USES, DELETE_USE, ADD_USE, ROOT_URL, REMOVE_USE } from '../constants/'

export function fetchUses (id, refType) {
  const request = axios.get(`${ROOT_URL}/uses/${id}/${refType}`)

  return {
    type: FETCH_USES,
    payload: request
  }
}

export function searchUses (term) {
  const request = axios.get(`${ROOT_URL}/uses/search?q=${term}`)

  return {
    type: SEARCH_USES,
    payload: request
  }
}

export function createUse (values) {
  const request = axios.post(`${ROOT_URL}/uses`, values)
  alert(`New Use ${values.title} created`)

  return {
    type: ADD_USE,
    payload: request
  }
}

export function fetchUse (id) {
  const request = axios.get(`${ROOT_URL}/uses/${id}`)
  return request

  /* return {
    type: FETCH_USE,
    payload: request
  }; */
}

export function deleteUse (useId) {
  axios.delete(`${ROOT_URL}/uses/${useId}`)

  return {
    type: DELETE_USE,
    payload: id
  }
}

export function removeUse (id, category, refId) {
  const request = axios.delete(`${ROOT_URL}/uses/${id}/${category}/${refId}`)

  return {
    type: REMOVE_USE,
    payload: request
  }
}

export function addUse (id, category, refId) {
  axios.post(`${ROOT_URL}/uses/${id}/${category}/${refId}`)

  return {
    type: ADD_USE,
    payload: { data: id }
  }
}
