import axios from 'axios'
import { FETCH_USES, SEARCH_USES, ADD_USE, ROOT_URL, REMOVE_USE } from '../constants/'

let token
export function fetchUses (id, refType) {
  const request = axios.get(`${ROOT_URL}/uses/${id}/${refType}`)

  return {
    type: FETCH_USES,
    payload: request
  }
}

export function searchUses (term) {
  return new Promise((resolve, reject) => {
    // Check if we made a request
    if (token) {
      // Cancel the previous request before making a new request
      token.cancel()
    }
    // Create a new CancelToken
    token = axios.CancelToken.source()
    axios.get(`${ROOT_URL}/uses/search?q=${term}`, { cancelToken: token.token })
      .then(request => {
        resolve({
          type: SEARCH_USES,
          payload: request
        })
      })
      .catch((error) => {
        // Ignore cancellations, reject on other errors
        if (!axios.isCancel(error)) reject(error)
      })
  })
}

export function createUse (values) {
  const request = axios.post(`${ROOT_URL}/uses`, values)

  return {
    type: ADD_USE,
    payload: request
  }
}

export function fetchUse (id) {
  const request = axios.get(`${ROOT_URL}/uses/${id}`)
  return request
}

export function deleteUse (useId) {
  const request = axios.delete(`${ROOT_URL}/uses/${useId}`)

  return request
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
