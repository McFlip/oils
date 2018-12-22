export const FETCH_PRODS = "fetch_prods";
export const FETCH_PROD = "fetch_prod";
// export const CREATE_PROD = "create_prod";
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
      wishlist: false,
      oil: {
        photosensitive: true,
        topical: true,
        dilute: true
      },
      uses: ["test use"]
    }
  }
}
export const testState2 = {
  prods: {
    a: {
      _id: 'a',
      sku: 1,
      descr: 'first',
      size: '1 oz',
      qty: 9,
      wishlist: false
    },
    b: {
      _id: 'b',
      sku: 2,
      descr: 'second',
      size: '1 oz',
      qty: 9,
      wishlist: true
    }
  }
}
