/* eslint-env jest */
import React from 'react'
import { render, fireEvent, newStore, wait } from '../test-utils'

import ProdsIndex from 'components/prods_index'
import ProdsShow from 'components/prods_show'

import * as prodsActionMock from 'actions/prods'

jest.mock('actions/prods')

const store = newStore()

// check delete
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
