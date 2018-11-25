import React from 'react';
import { render, fireEvent } from '../test-utils';
import ProdsIndex from 'components/prods_index';


const reducer = (state = {}, action) => {
  return state;
}

test('can render with initial state', () => {
  const {getByTestId, getByLabelText} = render(<ProdsIndex />, {
    reducer,
    initialState: {
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
  });
  expect(getByTestId('sku').textContent).toBe('1');
  expect(getByTestId('descr').textContent).toBe('test');
  expect(getByTestId('size').textContent).toBe('1 oz');
  expect(getByTestId('qty').textContent).toBe('9');
  expect(getByLabelText('wishlist').checked).toBe(false);
});
