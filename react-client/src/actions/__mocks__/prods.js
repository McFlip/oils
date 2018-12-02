import _ from "lodash";
import { FETCH_PRODS, FETCH_PROD, CREATE_PROD, DELETE_PROD, UPDATE_PROD, testState} from "constants/";

const testProd = testState.prods;

export const fetchProds = jest.fn(() => {
  return {
  type: FETCH_PRODS,
  payload: {data: [testProd.a]}
  }
});

export const searchProds = jest.fn((category, term) => {
  // console.log(`category: ${category}, term: ${term}`);
  if (!isNaN(term)) {
    term = parseInt(term);
  }
  const request = _.find(testProd, {[category]: term});
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
