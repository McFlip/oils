import axios from 'axios'
import { ROOT_URL } from '../constants'

export function fetchRecipe (id) {
  const request = axios.get(`${ROOT_URL}/recipes/${id}`)
  return request
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
