import { render } from 'react-testing-library';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import promise from "redux-promise";
import reducers from 'reducers/';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

function renderWithRedux(
  ui,
  {initialState, reducer = (state = {}) => state, store = createStore(reducer, initialState)} = {}) {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </Provider>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

export const newStore = () => {
  const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
  const store = createStoreWithMiddleware(reducers, {});
  return store;
}


// re-export everything
export * from 'react-testing-library';

// override render method
export {renderWithRedux as render};
