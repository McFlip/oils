import axios from "axios";
import { FETCH_PRODS, FETCH_PROD, CREATE_PROD, DELETE_PROD, ROOT_URL } from "../constants/";

export function fetchProds() {
  const request = axios.get(`${ROOT_URL}/products`);

  return {
    type: FETCH_PRODS,
    payload: request
  };
}

export function searchProds(category, term) {
  const request = axios.get(`${ROOT_URL}/products/search/${category}?q=${term}`);

  return {
    type: FETCH_PRODS,
    payload: request
  };
}

export function createProd(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/products`, values)
    .then(() => callback());

  return {
    type: CREATE_PROD,
    payload: request
  };
}

export function fetchProd(id) {
  const request = axios.get(`${ROOT_URL}/products/${id}`);

  return {
    type: FETCH_PROD,
    payload: request
  };
}

export function deleteProd(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/prods/${id}`)
    .then(() => callback());

  return {
    type: DELETE_PROD,
    payload: id
  };
}

export function updateProd(id, values) {
  const request = axios
    .post(`${ROOT_URL}/products/${id}`, values);

  return {
    type: FETCH_PROD,
    payload: request
  };
}
