import produce from 'immer'
import { FETCH_USES, SEARCH_USES, ADD_USE } from '../constants/'

export default function (state = {}, action) {
  switch (action.type) {
    case SEARCH_USES:
      return { ...state, uses: action.payload.data }
    case FETCH_USES:
      return { itemUses: action.payload.data }
    case ADD_USE: {
      const newState = produce(state, draftState => {
        const newUse = { _id: action.payload.data }
        draftState.itemUses.push(newUse)
      })
      return newState
    }
    default:
      return state
  }
}
