export const FETCH_PRODS = "fetch_prods";
export const FETCH_PROD = "fetch_prod";
export const CREATE_PROD = "create_prod";
export const DELETE_PROD = "delete_prod";
// export const UPDATE_PROD = 'update_prod'; // TODO: delete me
export const ROOT_URL = "http://localhost:3000";
export const testState = {
  prods: {
    a: {
      _id: 'a',
      sku: 1,
      descr: 'test',
      size: '1 oz',
      qty: 9,
      wishlist: false
    }
  }
}
