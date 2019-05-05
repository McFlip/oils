import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import 'bootstrap/dist/css/bootstrap.min.css'

import reducers from './reducers'
import Home from './components/home'
import PostsNew from './components/posts_new'
import PostsShow from './components/posts_show'
import ProdsIndex from './components/prods_index'
import ProdsShow from './components/prods_show'
import ProdsNew from './components/prods_new'
import UsesIndex from './components/uses_index'
import UsesShow from './components/uses_show'
import UsesAdd from './components/uses_add'
import RecipesIndex from './components/recipes_index'
import RecipesShow from './components/recipes_show'
import ProdsAdd from './components/prods_add'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <HashRouter>
      <div>
        <Switch>
          <Route path='/posts/new' component={PostsNew} />
          <Route path='/posts/:id' component={PostsShow} />
          <Route path='/products/new' component={ProdsNew} />
          <Route path='/products/:id/editingredients' component={ProdsAdd} />
          <Route path='/products/:id/edit' component={ProdsNew} />
          <Route path='/products/:id/adduse' component={UsesAdd} />
          <Route path='/products/:id' component={ProdsShow} />
          <Route path='/products' component={ProdsIndex} />
          <Route path='/uses/:id' component={UsesShow} />
          <Route path='/uses' component={UsesIndex} />
          <Route path='/recipes/:id/adduse' component={UsesAdd} />
          <Route path='/recipes/:id/editingredients' component={ProdsAdd} />
          <Route path='/recipes/:id' component={RecipesShow} />
          <Route path='/recipes' component={RecipesIndex} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>,
  document.querySelector('.container')
)
