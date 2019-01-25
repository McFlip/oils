import axios from "axios";
import { FETCH_USES, FETCH_USE, DELETE_USE, ROOT_URL } from "../constants/";

export function fetchUses(id, refType) {
  const request = axios.get(`${ROOT_URL}/uses`);

  return {
    type: FETCH_USES,
    payload: request
  };
}

export function searchUses(term) {
  const request = axios.get(`${ROOT_URL}/uses/search?q=${term}`);

  return {
    type: FETCH_USES,
    payload: request
  };
}

export function createUse(values) {
  const request = axios.post(`${ROOT_URL}/uses`, values);

  return {
    type: FETCH_USE,
    payload: request
  };
}

export function fetchUse(id) {
  const request = axios.get(`${ROOT_URL}/uses/${id}`);

  return {
    type: FETCH_USE,
    payload: request
  };
}

export function deleteUse(useId, refId, refType) {
  axios.delete(`${ROOT_URL}/uses/${useId}/${refId}/${refType}`);

  return {
    type: DELETE_USE,
    payload: id
  };
}

export function removeUse(id, category, refId) {
  console.log(id);
  axios.post(`${ROOT_URL}/uses/${id}/${category}/${refId}`);

// TODO: I don't know what to return here
  return {
    type: DELETE_USE,
    payload: id
  };
}
