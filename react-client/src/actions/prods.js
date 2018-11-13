import axios from "axios";

export const FETCH_PRODS = "fetch_prods";
export const FETCH_PROD = "fetch_prod";
export const CREATE_PROD = "create_prod";
export const DELETE_PROD = "delete_prod";

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
    .prod(`${ROOT_URL}/prods`, values)
    .then(() => callback());

  return {
    type: CREATE_prod,
    payload: request
  };
}

export function fetchProd(id) {
  const request = axios.get(`${ROOT_URL}/prods/${id}`);

  return {
    type: FETCH_prod,
    payload: request
  };
}

export function deleteProd(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/prods/${id}`)
    .then(() => callback());

  return {
    type: DELETE_prod,
    payload: id
  };
}