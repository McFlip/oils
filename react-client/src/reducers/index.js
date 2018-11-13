import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PostsReducer from "./reducer_posts";
import ProdsReducer from "./prods";

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer,
  prods: ProdsReducer
});

export default rootReducer;
