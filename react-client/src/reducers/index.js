import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import PostsReducer from './reducer_posts'
import ProdsReducer from './prods'
import UsesReducer from './uses'

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer,
  prods: ProdsReducer,
  uses: UsesReducer
})

export default rootReducer
