import _ from 'lodash'
import produce from 'immer'
import { FETCH_PRODS, FETCH_PROD, DELETE_PROD, REMOVE_USE } from '../constants/'

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_PROD:
      return _.omit(state, action.payload)
    case FETCH_PROD:
      return { ...state, [action.payload.data._id]: action.payload.data }
    case FETCH_PRODS:
      return _.mapKeys(action.payload.data, '_id')
    case REMOVE_USE:
      const newState = produce(state, draftState => {
        const refId = action.payload.data.refId
        const prod = draftState[refId]
        prod.uses = _.remove(prod.uses, i => i._id != action.payload.data.id)
      })
      return newState
    default:
      return state
  }
}
