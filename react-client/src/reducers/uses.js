import _ from "lodash";
import { FETCH_USES, FETCH_USE, SEARCH_USES, DELETE_USE, ROOT_URL, ADD_USE } from "../constants/";

export default function(state = {}, action) {
  switch (action.type) {
    case SEARCH_USES:
      return {...state, uses: action.payload.data}
    case FETCH_USES:
      return { itemUses: action.payload.data}
    case ADD_USE:
      const newUses = _.remove(state.uses, i => i._id != action.payload);
      return {...state, uses: newUses}
    default:
      return state;
  }
}
