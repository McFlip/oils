/* eslint-env jest */
import React from 'react'
import { render, newStore } from '../test-utils'

import ProdsShow from 'components/prods_show'

jest.mock('actions/prods')

const store = newStore()

// check render
test('render product', () => {
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
