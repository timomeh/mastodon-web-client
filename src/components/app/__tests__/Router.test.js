import React from 'react'
import {
  renderWithReduxAndRouter,
  generateAccount
} from '../../../lib/testing-utils'
import Router from '../Router'

jest.mock('../../user/UserFetcher')

const initialState = {
  users: {
    uaccts: ['me@funk.town', 'hi@funk.town'],
    entities: {
      'me@funk.town': generateAccount({ uri: 'funk.town', acct: 'me' }),
      'hi@funk.town': generateAccount({ uri: 'funk.town', acct: 'hi' })
    },
    tokens: {
      'me@funk.town': 'me_token',
      'hi@funk.town': 'hi_token'
    }
  }
}

describe('/', () => {
  it('renders start screen without user in store', () => {
    const { getByTestId } = renderWithReduxAndRouter(<Router />)
    expect(getByTestId('start-screen')).toBeInTheDocument()
  })

  it('renders root of first user with user in store', () => {
    const { getByLabelText } = renderWithReduxAndRouter(<Router />, {
      initialState
    })
    const changeUser = getByLabelText(/change user/i)
    expect(changeUser).toHaveTextContent(/@me.*funk\.town/)
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
    const { getByLabelText } = renderWithReduxAndRouter(<Router />, {
      initialState,
      route
    })
    const changeUser = getByLabelText(/change user/i)
    expect(changeUser).toHaveTextContent(/@hi.*funk\.town/)
  })
})

describe('/this-route-does-not-exist', () => {
  it('renders not found', () => {
    const route = '/this-route-does-not-exist'
    const { getByTestId } = renderWithReduxAndRouter(<Router />, { route })
    expect(getByTestId('not-found-screen')).toBeInTheDocument()
  })
})
