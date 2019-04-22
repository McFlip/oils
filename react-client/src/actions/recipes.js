import axios from "axios";
import { ROOT_URL, FETCH_RECIPE } from "../constants";

export function fetchRecipe(id) {
  const request = axios.get(`${ROOT_URL}/recipes/${id}`)
  return request;
}
