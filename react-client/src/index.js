import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from "./reducers";
import PostsNew from "./components/posts_new";
import PostsShow from "./components/posts_show";
import ProdsIndex from "./components/prods_index";
import ProdsShow from "./components/prods_show";
import ProdsNew from "./components/prods_new";
import Home from "./components/home";
import UsesIndex from "./components/uses_index";
import RecipesIndex from "./components/recipes_index";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <HashRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/products/new" component={ProdsNew} />
          <Route path="/products/:id/edit" component={ProdsNew} />
          <Route path="/products/:id" component={ProdsShow} />
          <Route path="/products" component={ProdsIndex} />
          <Route path="/uses" component={UsesIndex} />
          <Route path="/recipes" component={RecipesIndex} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>,
  document.querySelector(".container")
);
