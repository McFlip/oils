import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import PostsReducer from './reducer_posts'
import ProdsReducer from './prods'
import UsesReducer from './uses'
import RecipesReducer from './recipes'
import recipes from './recipes';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer,
  prods: ProdsReducer,
  uses: UsesReducer,
  recipes: RecipesReducer
})

export default rootReducer
