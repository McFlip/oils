import _ from "lodash";
import { FETCH_PRODS, FETCH_PROD, DELETE_PROD } from "../constants/";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_PROD:
      return _.omit(state, action.payload);
    case FETCH_PROD:
      return { ...state, [action.payload.data._id]: action.payload.data };
    case FETCH_PRODS:
      return _.mapKeys(action.payload.data, "_id");
    default:
      return state;
  }
}
