import React from 'react'
import { renderWithReduxAndRouter } from '../../../lib/testing-utils'
import Router from '../Router'

describe('/', () => {
  it('renders start screen without user in store', () => {
    const { getByTestId } = renderWithReduxAndRouter(<Router />)
    expect(getByTestId('start-screen')).toBeInTheDocument()
  })

  it('renders root of first user with user in store', () => {
    const { getByTestId, getByText } = renderWithReduxAndRouter(<Router />, {
      initialState: { users: { uaccts: ['me@funk.town', 'hi@funk.town'] } }
    })
    expect(getByTestId('user-root')).toBeInTheDocument()
    expect(getByText('me@funk.town')).toBeInTheDocument()
  })
})

describe('/:uacct', () => {
  it('renders not found without user in store', () => {
    const route = '/me@funk.town'
    const { getByTestId } = renderWithReduxAndRouter(<Router />, { route })
    expect(getByTestId('not-found-screen')).toBeInTheDocument()
  })

  it('renders root of user with user in store', () => {
    const route = '/hi@funk.town'
    const { getByTestId, getByText } = renderWithReduxAndRouter(<Router />, {
      initialState: { users: { uaccts: ['me@funk.town', 'hi@funk.town'] } },
      route
    })
    expect(getByTestId('user-root')).toBeInTheDocument()
    expect(getByText('hi@funk.town')).toBeInTheDocument()
  })
})
