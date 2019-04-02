import axios from "axios";
import { FETCH_USES, FETCH_USE, SEARCH_USES, DELETE_USE, ADD_USE, ROOT_URL } from "../constants/";

export function fetchUses(id, refType) {
  const request = axios.get(`${ROOT_URL}/uses/${id}/${refType}`);

  return {
    type: FETCH_USES,
    payload: request
  };
}

export function searchUses(term) {
  const request = axios.get(`${ROOT_URL}/uses/search?q=${term}`);

  return {
    type: SEARCH_USES,
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

export function deleteUse(useId) {
  axios.delete(`${ROOT_URL}/uses/${useId}`);

  return {
    type: DELETE_USE,
    payload: id
  };
}

export function removeUse(id, category, refId) {
  axios.delete(`${ROOT_URL}/uses/${id}/${category}/${refId}`);

// TODO: I don't know what to return here
  return {
    type: DELETE_USE,
    payload: id
  };
}

export function addUse(id, category, refId) {
  axios.post(`${ROOT_URL}/uses/${id}/${category}/${refId}`);

// TODO: I don't know what to return here
  return {
    type: ADD_USE,
    payload: id
  };
}