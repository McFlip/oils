import _ from 'lodash'
import produce from 'immer'
import { FETCH_PRODS, FETCH_PROD, DELETE_PROD, REMOVE_USE } from '../constants/'

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_PROD:
      return _.omit(state, action.payload.data)
    case FETCH_PROD:
      return { ...state, prod: action.payload.data, [action.payload.data._id]: action.payload.data }
    case FETCH_PRODS: 
      return { ..._.mapKeys(action.payload.data, '_id'), prod: { ...state.prod } }
    case REMOVE_USE: {
      const newState = produce(state, draftState => {
        const { id, refId, category } = action.payload.data
        if (category === 'product') {
          const prod = draftState[refId]
          prod.uses = _.remove(prod.uses, i => i._id != id)
        } else {
          return state
        }
      })
      return newState
    }
    default:
      return state
  }
}
