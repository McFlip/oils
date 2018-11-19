import React from 'react';
import { render, fireEvent } from '../test-utils';
import ProdsList from 'components/prods_list';


const reducer = (state = {}, action) => {
  return state;
}

test('can render with initial state', () => {
  const {getByTestId} = render(<ProdsList />, {
    reducer,
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
