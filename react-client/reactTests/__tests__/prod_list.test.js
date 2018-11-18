import React from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import { render, fireEvent } from 'react-testing-library';
import ProdsList from 'components/prods_list';
import { BrowserRouter } from "react-router-dom";

function reducer(state = {}, action){
  return state;
}

function renderWithRedux(
  ui,
  {initialState, store = createStore(reducer, initialState)} = {}) {
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

test('can render with initial state', () => {
  const {getByTestId} = renderWithRedux(<ProdsList />, {
    initialState: {
      prods: [
        {
          sku: 1,
          descr: 'test',
          size: '1 oz',
          qty: 9
        }
      ]
    }
  });
  expect(getByTestId('sku').textContent).toBe('1');
});
