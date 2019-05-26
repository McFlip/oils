/* eslint-env jest */
import React from 'react'
import { render, fireEvent, newStore, wait } from '../test-utils'

import ProdsIndex from 'components/prods_index'
import ProdsShow from 'components/prods_show'

import * as prodsActionMock from 'actions/prods'

jest.mock('actions/prods')

// check delete
const store = newStore()

test('delete pt1', () => {
  const { getByText } = render(
    <ProdsShow
      match={{
        params: { id: 'a' },
        isExact: true,
        path: '',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  expect(getByText('test 1 oz')).toBeTruthy()
  fireEvent.click(getByText('Actions'))
  fireEvent.click(getByText('Delete Product'))
  expect(prodsActionMock.deleteProd).toHaveBeenCalledTimes(1)
  // check arguments
  expect(prodsActionMock.deleteProd.mock.calls[0][0]).toBe('a')
})

// we should fail to show the deleted item
test('delete pt2', async () => {
  const { queryByTestId } = render(<ProdsIndex />, { store })
  await wait(() => expect(queryByTestId('sku')).toBeNull())
})

// check render
test('render product', () => {
  const store = newStore()
  const product = render(
    <ProdsShow
      match={{
        params: { id: 'a' },
        isExact: true,
        path: '',
        url: ''
      }}
      history={{
        location: { state: undefined },
        push: () => null
      }}
    />,
    { store }
  )
  expect(product).toMatchSnapshot()
})
