import React from 'react';
import { render, fireEvent, newStore } from '../test-utils';

import ProdsIndex from 'components/prods_index';
import ProdsShow from 'components/prods_show';

import * as prodsActionMock from 'actions/prods';

jest.mock('actions/prods');
global.confirm = () => true

// check delete
const store = newStore();

test('delete pt1', () => {
  const {getByText} = render(
    <ProdsShow
      match={{
        params: {id: 'a'},
        isExact: true,
        path: "",
        url: ""
      }}
      history={{
        location: { state: undefined }
      }}
    />,
    { store }
  );
  expect(getByText('test 1 oz')).toBeTruthy;
  fireEvent.click(getByText('Actions'));
  fireEvent.click(getByText('Delete Product'));
  expect(prodsActionMock.deleteProd).toHaveBeenCalledTimes(1);
  // check arguments
  expect(prodsActionMock.deleteProd.mock.calls[0][0]).toBe('a');
});

test('delete pt2', () => {
  const {queryByTestId, getByText} = render(<ProdsIndex />, { store });
  // we should fail to show the deleted item
  fireEvent.click(getByText('Actions'));
  fireEvent.click(getByText('List All'));
  expect(queryByTestId('sku')).toBeNull;
});
