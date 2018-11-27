import _ from "lodash";
export const FETCH_PRODS = "fetch_prods";
export const FETCH_PROD = "fetch_prod";
export const CREATE_PROD = "create_prod";
export const DELETE_PROD = "delete_prod";
export const UPDATE_PROD = 'update_prod';

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
  console.log([testProd]);
  return {
  type: FETCH_PRODS,
  payload: [testProd]
  }
});

export const updateProd = jest.fn((id, values) => {
  return {
    type: FETCH_PROD,
    payload: _.assignIn(testProd.id, values)
  };
});
