import React from 'react'
import { wait } from 'react-testing-library'
import { renderWithReduxAndRouter } from '../../../lib/testing-utils'
import Router from '../Router'

jest.mock('../../user/UserFetcher')

describe('/', () => {
  it('renders start screen without user in store', () => {
    const { getByTestId } = renderWithReduxAndRouter(<Router />)
    expect(getByTestId('start-screen')).toBeInTheDocument()
  })

  it('renders root of first user with user in store', async () => {
    const { getByTestId, getByText } = renderWithReduxAndRouter(<Router />, {
      initialState: { users: { uaccts: ['me@funk.town', 'hi@funk.town'] } }
    })
    expect(getByTestId('user-root')).toBeInTheDocument()
    expect(getByText('me@funk.town')).toBeInTheDocument()
    await wait()
  })
})

describe('/:uacct', () => {
  it('renders not found without user in store', () => {
    const route = '/me@funk.town'
    const { getByTestId } = renderWithReduxAndRouter(<Router />, { route })
    expect(getByTestId('not-found-screen')).toBeInTheDocument()
  })

  it('renders root of user with user in store', async () => {
    const route = '/hi@funk.town'
    const { getByTestId, getByText } = renderWithReduxAndRouter(<Router />, {
      initialState: { users: { uaccts: ['me@funk.town', 'hi@funk.town'] } },
      route
    })
    expect(getByTestId('user-root')).toBeInTheDocument()
    expect(getByText('hi@funk.town')).toBeInTheDocument()
    await wait()
  })
})

describe('/this-route-does-not-exist', () => {
  it('renders not found', () => {
    const route = '/this-route-does-not-exist'
    const { getByTestId } = renderWithReduxAndRouter(<Router />, { route })
    expect(getByTestId('not-found-screen')).toBeInTheDocument()
  })
})
