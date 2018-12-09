import React from 'react';
import { render, fireEvent, wait, newStore } from '../test-utils';

import ProdsNew from 'components/prods_new';
import * as prodsActionMock from 'actions/prods';

jest.mock('actions/prods');

test('validate function stops form submission', () => {
  const store = newStore();
  const {getByText}  = render(
    <ProdsNew match={{params: {id: false}, isExact: true, path: "", url: ""}} />,
    {store}
  );
  fireEvent.click(getByText('Submit'));
  expect(getByText('Description is required')).toBeTruthy;
  expect(prodsActionMock.fetchProd).toHaveBeenCalledTimes(0);
});

test('can render with loaded state', async () => {
  const store = newStore();
  const {getByTestId} = render(
    <ProdsNew match={{params: {id: 'a'}, isExact: true, path: "", url: ""}} />,
    { store }
  );
  await wait(()=> expect(getByTestId('sku').value).toBe('1'));
  expect(getByTestId('descr').value).toBe('test');
  expect(getByTestId('size').value).toBe('1 oz');
  expect(getByTestId('qty').value).toBe('9');
  expect(getByTestId('wishlist').checked).toBe(false);
  expect(getByTestId('oil').checked).toBe(false);
  // expect(getByTestId('fubar').textContent).toBe('test');
  // TODO: Test oil details like topical
});

// TODO: test good submission by checking args