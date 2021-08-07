// Redux actions
export const FETCH_PRODS = 'fetch_prods'
export const FETCH_PROD = 'fetch_prod'
export const DELETE_PROD = 'delete_prod'
export const FETCH_POSTS = 'fetch_posts'
export const FETCH_POST = 'fetch_post'
export const CREATE_POST = 'create_post'
export const DELETE_POST = 'delete_post'
export const FETCH_USES = 'fetch_uses'
export const FETCH_USE = 'fetch_use'
export const SEARCH_USES = 'search_uses'
export const DELETE_USE = 'delete_use'
export const ADD_USE = 'add_use'
export const REMOVE_USE = 'remove_use'
export const FETCH_RECIPE = 'fetch_recipe'
export const DELETE_RECIPE = 'DELETE_RECIPE'
// API URLs
export const ROOT_URL = process.env.ROOT_URL || 'http://localhost:3000'
export const IMG_HOST = process.env.IMG_HOST || 'http://localhost:3000/images/'
// JSON Web Token acts as API key
// export const JWT = process.env.JWT ? process.env.JWT : window.localStorage.getItem('jwt')
export const JWT = window.localStorage.getItem('jwt')
