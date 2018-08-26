import React from 'react'
import Router from '../Router'

describe('IndexRoute', () => {
  describe('without a user in the store', () => {
    it('renders start screen without uacct param', () => {
      const { getByTestId } = renderWithReduxAndRouter(<Router />)
      expect(getByTestId('start-screen')).toBeInTheDocument()
    })

    it('renders not found with uacct param', () => {
      const route = '/me@funk.town'
      const { getByTestId } = renderWithReduxAndRouter(<Router />, { route })
      expect(getByTestId('not-found-screen')).toBeInTheDocument()
    })
  })

  describe('with a user in the store', () => {
    const initialState = { users: { uaccts: ['me@funk.town', 'hi@funk.town'] } }

    it('renders root of first user without uacct param', () => {
      const { getByTestId, getByText } = renderWithReduxAndRouter(<Router />, {
        initialState
      })
      expect(getByTestId('user-root')).toBeInTheDocument()
      expect(getByText('me@funk.town')).toBeInTheDocument()
    })

    it('renders root of user with uacct param', () => {
      const route = '/hi@funk.town'
      const { getByTestId, getByText } = renderWithReduxAndRouter(<Router />, {
        initialState,
        route
      })
      expect(getByTestId('user-root')).toBeInTheDocument()
      expect(getByText('hi@funk.town')).toBeInTheDocument()
    })
  })
})
