/* eslint-env jest */
import React from 'react'
import { render, fireEvent, wait, newStore } from '../test-utils'

import ProdsNew from 'components/prods_new'
import ProdsShow from 'components/prods_show'
import * as prodsActionMock from 'actions/prods'

jest.mock('actions/prods')

// Create a new product then view it
const store = newStore()
test('create a new product', async () => {
  const { getByText, getByTestId } = render(
    <ProdsNew
      match={{ params: { id: false }, isExact: true, path: '', url: '' }}
      history={{ push: () => null }}
    />,
    { store }
  )
  fireEvent.change(getByTestId('sku'), { target: { value: 69 } })
  fireEvent.change(getByTestId('descr'), { target: { value: 'new hotness' } })
  fireEvent.change(getByTestId('size'), { target: { value: '2 pack 5 oz' } })
  fireEvent.change(getByTestId('category'), { target: { value: 'TEST' } })
  fireEvent.change(getByTestId('qty'), { target: { value: 5 } })
  fireEvent.change(getByTestId('wholesale'), { target: { value: 99 } })
  fireEvent.change(getByTestId('retail'), { target: { value: 999 } })
  fireEvent.change(getByTestId('pv'), { target: { value: 100 } })
  fireEvent.click(getByTestId('wishlist'))
  fireEvent.click(getByTestId('oil'))
  await wait(() => fireEvent.click(getByTestId('aromatic')))
  fireEvent.click(getByText('Submit'))
  expect(prodsActionMock.createProd).toHaveBeenCalledTimes(1)
})

test('can render the new product', async () => {
  const { getByText, getByLabelText } = render(
    <ProdsShow
      match={{
        params: { id: 'testid' },
        isExact: true,
        path: '',
        url: ''
      }}
      history={{
        location: { state: { referer: 'NewProds' } }
      }}
    />,
    { store }
  )
  await wait(() => expect(getByText('new hotness 2 pack 5 oz')).toBeTruthy)
  expect(getByText('$0.99')).toBeTruthy()
  expect(getByText('$9.99')).toBeTruthy()
  expect(getByText('1')).toBeTruthy()
  expect(getByLabelText('wishlist').checked).toBe(true)
  expect(getByLabelText('photosensitive').checked).toBe(false)
  expect(getByLabelText('topical').checked).toBe(false)
  expect(getByLabelText('dilute').checked).toBe(false)
  expect(getByLabelText('aromatic').checked).toBe(true)
  expect(getByLabelText('dietary').checked).toBe(false)
})
