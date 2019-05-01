export const FETCH_PRODS = 'fetch_prods'
export const FETCH_PROD = 'fetch_prod'
export const DELETE_PROD = 'delete_prod'
export const ROOT_URL = 'http://localhost:3000'
export const FETCH_USES = 'fetch_uses'
export const FETCH_USE = 'fetch_use'
export const SEARCH_USES = 'search_uses'
export const DELETE_USE = 'delete_use'
export const ADD_USE = 'add_use'
export const REMOVE_USE = 'remove_use'
export const FETCH_RECIPE = 'fetch_recipe'
export const DELETE_RECIPE = 'DELETE_RECIPE'
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
      uses: ['test use']
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
export const testUses = [
  {
    _id: 'createdUseId',
    title: 'createdUseTitle'
  },
  {
    _id: 'firstUseId',
    title: 'firstUseTitle'
  },
  {
    _id: 'secondUseId',
    title: 'secondUseTitle'
  }
]
