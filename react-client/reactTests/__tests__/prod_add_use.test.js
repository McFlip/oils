import React from 'react';
import { render, fireEvent, wait, newStore } from '../test-utils';

import UsesAdd from 'components/uses_add';
import * as prodsActionMock from 'actions/prods';
import * as usesActionMock from 'actions/use';

jest.mock('actions/prods');
jest.mock('actions/use');

// Create a new product then view it
test('create a new use and search', async () => {
  const store = newStore();
  const {getByText, getByTestId, queryByText}  = render(
    <UsesAdd
      match={{params: {id: 'testId'}, isExact: true, path: "products", url: ""}}
    />,
  {store}
  );
  fireEvent.change(getByTestId('createUseInput'), {target: {value: "createdUseTitle"}});
  fireEvent.click(getByText("Create"));
  expect(usesActionMock.createUse).toHaveBeenCalledTimes(1);
  expect(usesActionMock.createUse).toBeCalledWith({
    title: "createdUseTitle",
    category: "product",
    refId: "testId"
  });
  fireEvent.click(getByTestId('Search'));
  expect(usesActionMock.searchUses).toHaveBeenCalledTimes(1);
  await wait(expect(getByText("secondUseTitle")).toBeTruthy);
  expect(queryByText("firstUseTitle")).not.toBeInTheDocument();
  // TODO: add the 2nd use and make sure it dissapeared
});