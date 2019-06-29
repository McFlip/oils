import axios from 'axios'
import { ROOT_URL, FETCH_RECIPE, DELETE_RECIPE } from '../constants'

export function fetchRecipe (id) {
  const request = axios.get(`${ROOT_URL}/recipes/${id}`)
  return {
    type: FETCH_RECIPE,
    payload: request
  }
}

export function searchRecipes (term) {
  const request = axios.get(`${ROOT_URL}/recipes/search?q=${term}`)
  return request
}

export function createRecipe (recipe, callback) {
  axios
    .post(`${ROOT_URL}/recipes/create`, recipe)
    .then(r => callback(r.data))
}

export function updateRecipe (id, value) {
  const request = axios.post(`${ROOT_URL}/recipes/${id}/`, value)
  return {
    type: FETCH_RECIPE,
    payload: request
  }
}

export function deleteRecipe (id) {
  const request = axios
    .delete(`${ROOT_URL}/recipes/${id}`)
  return {
    type: DELETE_RECIPE,
    payload: request
  }
}
