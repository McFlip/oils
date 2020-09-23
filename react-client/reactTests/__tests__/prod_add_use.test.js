/* eslint-env jest */
import React from 'react'
import { render, fireEvent, wait, newStore } from '../test-utils'

import UsesAdd from 'components/uses_add'
// import * as prodsActionMock from 'actions/prods';
import * as usesActionMock from 'actions/use'

jest.mock('actions/prods')
jest.mock('actions/use')
jest.mock('jquery', () => {
  return function () {
    return { toast: () => {} }
  }
})

// Create a new product use, search for and add an existing use
test('create a new use and search', async () => {
  const store = newStore()
  const { getByText, getByTestId, queryByText } = render(
    <UsesAdd
      match={{ params: { id: 'testId' }, isExact: true, path: 'products', url: '' }}
    />,
    { store }
  )
  // create new use
  fireEvent.change(getByTestId('createUseInput'), { target: { value: 'createdUseTitle' } })
  fireEvent.click(getByTestId('Create'))
  expect(usesActionMock.createUse).toHaveBeenCalledTimes(1)
  expect(usesActionMock.createUse).toBeCalledWith({
    title: 'createdUseTitle',
    category: 'product',
    refId: 'testId'
  })
  // search uses
  fireEvent.change(getByTestId('createUseInput'), { target: { value: 'secondUse' } })
  expect(usesActionMock.searchUses).toHaveBeenCalledTimes(2)
  await wait(expect(getByText('secondUseTitle')).toBeTruthy)
  expect(queryByText('firstUseTitle')).not.toBeInTheDocument()
  //  add the 2nd use and make sure it dissapeared
  fireEvent.click(getByTestId('use-btn'))
  expect(usesActionMock.addUse).toHaveBeenCalledTimes(1)
  expect(usesActionMock.addUse).toBeCalledWith('secondUseId', 'product', 'testId')
  await wait(expect(queryByText('secondUseTitle')).not.toBeInTheDocument)
})
