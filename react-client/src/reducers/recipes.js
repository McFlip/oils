import { FETCH_RECIPE } from '../constants'

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_RECIPE:
            return { ...state, recipe: action.payload.data }
    
        default:
            return state
    }
}