import _ from 'lodash'
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../constants'

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload)
    case FETCH_POST:
      return { ...state, post: action.payload.data }
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, '_id')
    default:
      return state
  }
}
