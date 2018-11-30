import React from 'react';
import promise from "redux-promise";
import { createStore, applyMiddleware } from "redux";

import { render, fireEvent, wait } from '../test-utils';

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


test('List All, qty button, wishlist', async () => {
  const {getByTestId, getByLabelText, getByText} = render(<ProdsIndex />, { store });
  // check render
  expect(getByTestId('sku')).toBeFalsey;
  fireEvent.click(getByText('Actions'));
  fireEvent.click(getByText('List All'));
  expect(getByTestId('sku').textContent).toBe('1');
  expect(getByTestId('descr').textContent).toBe('test');
  expect(getByTestId('size').textContent).toBe('1 oz');
  expect(getByTestId('qty').textContent).toBe('9');
  expect(getByLabelText('wishlist').checked).toBe(false);
  // check wishlist
  fireEvent.click(getByLabelText('wishlist'));
  expect(getByLabelText('wishlist').checked).toBe(true);
  expect(prodsActionMock.updateProd).toHaveBeenCalledTimes(1);
  fireEvent.click(getByLabelText('wishlist'));
  expect(getByLabelText('wishlist').checked).toBe(false);
  expect(prodsActionMock.updateProd).toHaveBeenCalledTimes(2);
  // check qty button
  // open and close w/out submit
  fireEvent.click(getByTestId('qtyButton'));
  expect(getByText('Save changes')).toBeTruthy;
  await wait(()=>expect(getByLabelText('QTY:').value).toBe('9'));
  fireEvent.change(getByLabelText('QTY:'), {target: {value: '10'}});
  fireEvent.click(getByText('Close'));
  expect(getByText('Save changes')).toBeFalsey;
  fireEvent.click(getByTestId('qtyButton'));
  expect(getByText('Save changes')).toBeTruthy;
  await wait(()=>expect(getByLabelText('QTY:').value).toBe('9'));
  fireEvent.change(getByLabelText('QTY:'), {target: {value: '11'}});
  fireEvent.click(getByTestId('xButton'));
  expect(getByText('Save changes')).toBeFalsey;
  fireEvent.click(getByTestId('qtyButton'));
  await wait(()=>expect(getByLabelText('QTY:').value).toBe('9'));
  // check submit
  fireEvent.change(getByLabelText('QTY:'), {target: {value: '5'}});
  fireEvent.click(getByText('Save changes'));
  await wait(()=>expect(getByTestId('qty').textContent).toBe('5'));
  fireEvent.click(getByTestId('qtyButton'));
  await wait(()=>expect(getByLabelText('QTY:').value).toBe('5'));
});

test('Search Bar', async () => {
  // check correct sku
  const {getByTestId, getByLabelText, getByText} = render(<ProdsIndex />, { store });
  fireEvent.change(getByTestId('searchInput'), {target: {value: '1'}});
  fireEvent.click(getByText('Search'));
  await wait(()=>   expect(getByTestId('sku').textContent).toBe('1'));
  // check bad sku
  fireEvent.change(getByTestId('searchInput'), {target: {value: '2'}});
  fireEvent.click(getByText('Search'));
  await wait(()=> expect(getByTestId('sku')).toBeFalsey);
  // check correct descr
  fireEvent.click(getByTestId('searchSelect'));
  fireEvent.click(getByText('Description'));
  fireEvent.change(getByTestId('searchInput'), {target: {value: 'test'}});
  fireEvent.click(getByText('Search'));
  await wait(()=>   expect(getByTestId('sku').textContent).toBe('1'));
  // check bad descr
  fireEvent.change(getByTestId('searchInput'), {target: {value: 'fake news'}});
  fireEvent.click(getByText('Search'));
  await wait(()=> expect(getByTestId('sku')).toBeFalsey);
});
