import _ from "lodash";
import { FETCH_PRODS, FETCH_PROD, CREATE_PROD, DELETE_PROD, UPDATE_PROD, testState, testState2} from "constants/";

const testProd = testState.prods;
const testProd2 = testState2.prods; // has 2 prods

export const fetchProds = jest.fn(() => {
  return {
  type: FETCH_PRODS,
  payload: {data: [testProd.a]}
  }
});

export const fetchProd = jest.fn((id) => {
  return {
  type: FETCH_PROD,
  payload: {data: testProd.a}
  }
});

export const createProd = jest.fn((values, callback) => {
  return {
  type: CREATE_PROD,
  payload: {}
  }
});

export const searchProds = jest.fn((category, term) => {
  // console.log(`category: ${category}, term: ${term}`);
  let request;
  // cast to int
  if (!isNaN(term)) {
    term = parseInt(term);
  }
  // filter wishlist test has 2 prods
  // cast to boolean
  if (category == 'wishlist') {
    term = (term == 'true');
    request = _.find(testProd2, {[category]: term});
  } else {
    request = _.find(testProd, {[category]: term});
  }
  let result = [];
  if (request) {
    result = [request];
  }
  return {
    type: FETCH_PRODS,
    payload: {data: result}
  };
});

export const updateProd = jest.fn((id, values) => {
  return {
    type: FETCH_PROD,
    payload: {data: _.assignIn(testProd[id], values)}
  };
});

export const deleteProd = jest.fn((_id) => {
  let request;
  request = _.find(testProd2, { _id });
  const result = request || {};
  return {
    type: DELETE_PROD,
    payload: {data: result}
  };
});
