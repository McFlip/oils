import { FETCH_RECIPE, REMOVE_USE } from '../constants'
import produce from 'immer'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_RECIPE:
      return { ...state, recipe: action.payload.data }
    case REMOVE_USE: {
      const newState = produce(state, draftState => {
        const { id, category } = action.payload.data
        if (category === 'recipe') {
          draftState.recipe.uses = _.remove(draftState.recipe.uses, i => i._id != id)
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
