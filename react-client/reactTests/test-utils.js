import {render} from 'react-testing-library';
import React from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import { BrowserRouter } from "react-router-dom";

//const reducer = () => null; // override this in the test

function renderWithRedux(
  ui,
  {initialState, reducer, store = createStore(reducer, initialState)} = {}) {
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

// re-export everything
export * from 'react-testing-library';

// override render method
export {renderWithRedux as render};
