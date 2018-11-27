import React from 'react';
import promise from "redux-promise";
import { createStore, applyMiddleware } from "redux";

import { render, fireEvent } from '../test-utils';
import ProdsIndex from 'components/prods_index';
import reducers from 'reducers/';
import * as prodsActionMock from 'actions/prods';

jest.mock('actions/prods');

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers, testState);

const reducer = (state = {}, action) => {
  return state;
}

const testState = {
  prods: {
    a: {
      _id: 'a',
      sku: 1,
      descr: 'test',
      size: '1 oz',
      qty: 9,
      wishlist: false
    }
  }
}

test('can render with initial state', () => {
  const {getByTestId, getByLabelText} = render(<ProdsIndex />, {
    reducer,
    initialState: testState
  });
  expect(getByTestId('sku').textContent).toBe('1');
  expect(getByTestId('descr').textContent).toBe('test');
  expect(getByTestId('size').textContent).toBe('1 oz');
  expect(getByTestId('qty').textContent).toBe('9');
  expect(getByLabelText('wishlist').checked).toBe(false);
});


test('List All', () => {
  const {getByTestId, getByLabelText, getByText} = render(<ProdsIndex />, { store });
  fireEvent.click(getByText('Actions'));
  fireEvent.click(getByText('List All'));
  expect(getByTestId('sku').textContent).toBe('1');
  expect(getByTestId('descr').textContent).toBe('test');
  expect(getByTestId('size').textContent).toBe('1 oz');
  expect(getByTestId('qty').textContent).toBe('9');
  expect(getByLabelText('wishlist').checked).toBe(false);
  // fireEvent.click(getByLabelText('wishlist'));
  // expect(getByLabelText('wishlist').checked).toBe(true);
  // expect(prodsActionMock.updateProd).toHaveBeenCalledTimes(1);
});
