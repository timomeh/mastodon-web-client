import React from 'react'
import { wait } from 'react-testing-library'
import { renderWithReduxAndRouter } from '../../../lib/testing-utils'

import AuthorizedScreen from '../AuthorizedScreen'
import fetch, { call } from '../../../lib/mastodon/fetch-factory'

const props = {
  location: { search: '?code=secretcode' },
  match: { params: { uri: 'funk.town' } }
}
const initialState = {
  clients: { 'funk.town': { clientId: 'abc', clientSecret: '123' } }
}

describe('with a successful response', () => {
  beforeEach(() => {
    call
      .mockImplementationOnce(() => Promise.resolve({ accessToken: 'secret' }))
      .mockImplementationOnce(() =>
        Promise.resolve({
          acct: 'me',
          url: 'https://funk.town/@me'
        })
      )
  })

  it('fetches the access token', async () => {
    const { store } = renderWithReduxAndRouter(
      <AuthorizedScreen {...props} />,
      { initialState }
    )

    await wait()
    expect(fetch).toHaveBeenCalledWith('funk.town')
    expect(call).toHaveBeenCalledWith(
      '/oauth/token',
      expect.objectContaining({
        body: expect.objectContaining({
          code: 'secretcode',
          clientId: 'abc',
          clientSecret: '123'
        })
      })
    )
    expect(store.getState()).toMatchObject({
      users: { tokens: { 'me@funk.town': 'secret' } }
    })
  })

  it('fetches the user', async () => {
    const { store } = renderWithReduxAndRouter(
      <AuthorizedScreen {...props} />,
      { initialState }
    )

    await wait()
    expect(fetch).toHaveBeenCalledWith('funk.town')
    expect(call).toHaveBeenCalledWith('/api/v1/accounts/verify_credentials', {
      token: 'secret'
    })
    expect(store.getState()).toMatchObject({
      users: { entities: { 'me@funk.town': {} } },
      app: { uacct: 'me@funk.town' }
    })
  })

  it('redirects to the user root', async () => {
    const { history } = renderWithReduxAndRouter(
      <AuthorizedScreen {...props} />,
      { route: '/authorized/funk.town?code=secretcode', initialState }
    )

    await wait()
    expect(history.location.pathname).toBe('/')
  })

  it('displays a Loading message', async () => {
    const { getByText } = renderWithReduxAndRouter(
      <AuthorizedScreen {...props} />,
      { initialState }
    )
    const loading = getByText(/Loading/)

    expect(loading).toBeInTheDocument()
    await wait()
    expect(loading).not.toBeInTheDocument()
  })
})

describe('with a failed response', () => {
  beforeEach(() => {
    call.mockImplementationOnce(() => Promise.reject())
  })

  it('shows an error', async () => {
    const { getByText } = renderWithReduxAndRouter(
      <AuthorizedScreen {...props} />,
      { initialState }
    )

    expect(getByText(/Loading/)).toBeInTheDocument()
    await wait()
    expect(getByText(/Error/)).toBeInTheDocument()
  })
})
