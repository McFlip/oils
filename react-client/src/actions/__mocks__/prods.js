import _ from "lodash";
import { FETCH_PRODS, FETCH_PROD, CREATE_PROD, DELETE_PROD, UPDATE_PROD } from "constants/";

const testProd = {
  a: {
    _id: 'a',
    sku: 1,
    descr: 'test',
    size: '1 oz',
    qty: 9,
    wishlist: false
  }
};

export const fetchProds = jest.fn(() => {
  return {
  type: FETCH_PRODS,
  payload: {data: [testProd.a]}
  }
});

export const updateProd = jest.fn((id, values) => {
  return {
    type: FETCH_PROD,
    payload: {data: _.assignIn(testProd[id], values)}
  };
});
