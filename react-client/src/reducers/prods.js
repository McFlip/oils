import _ from 'lodash'
import produce from 'immer'
import { FETCH_PRODS, FETCH_PROD, DELETE_PROD, REMOVE_USE } from '../constants/'

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_PROD:
      return _.omit(state, action.payload.data)
    case FETCH_PROD: {
      const { data } = action.payload
      if (data.inventory) {
        if (data.inventory.length > 0) {
          data.qty = data.inventory[0].qty
          data.wishlist = data.inventory[0].wishlist
        }
        delete data.inventory
      }
      return { ...state, prod: action.payload.data, [action.payload.data._id]: action.payload.data }
    }
    case FETCH_PRODS: {
      const { data } = action.payload
      data.forEach(p => {
        if (p.inventory) {
          if (p.inventory.length > 0) {
            p.qty = p.inventory[0].qty
            p.wishlist = p.inventory[0].wishlist
          }
          delete p.inventory
        }
      })
      return { ..._.mapKeys(action.payload.data, '_id'), prod: { ...state.prod } }
    }
    case REMOVE_USE: {
      const newState = produce(state, draftState => {
        const { id, refId, category } = action.payload.data
        if (category === 'product') {
          const prod = draftState[refId]
          prod.uses = _.remove(prod.uses, i => i._id !== id)
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
