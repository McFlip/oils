import axios from "axios";

export const FETCH_PRODS = "fetch_prods";
export const FETCH_PROD = "fetch_prod";
export const CREATE_PROD = "create_prod";
export const DELETE_PROD = "delete_prod";
export const UPDATE_PROD = 'update_prod';

const ROOT_URL = "http://localhost:3000";

export function fetchProds() {
  const request = axios.get(`${ROOT_URL}/products`);

  return {
    type: FETCH_PRODS,
    payload: request
  };
}

export function createProd(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/prods`, values)
    .then(() => callback());

  return {
    type: CREATE_PROD,
    payload: request
  };
}

export function fetchProd(id) {
  const request = axios.get(`${ROOT_URL}/prods/${id}`);

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
