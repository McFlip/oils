import _ from "lodash";
import { FETCH_USES, FETCH_USE, SEARCH_USES, DELETE_USE, ROOT_URL } from "../constants/";

export default function(state = {}, action) {
  switch (action.type) {
    case SEARCH_USES:
      return {...state, uses: action.payload.data}
    case FETCH_USES:
      return { itemUses: action.payload.data}
    default:
      return state;
  }
}
