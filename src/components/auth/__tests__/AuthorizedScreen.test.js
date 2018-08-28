import React from 'react'
import { wait } from 'react-testing-library'
import { renderWithReduxAndRouter } from '../../../lib/testing-utils'

import AuthorizedScreen from '../AuthorizedScreen'

const props = {
  location: { search: '?code=snazzy_code' },
  match: { params: { uri: 'funk.town' } }
}
const initialState = {
  clients: {
    'funk.town': { clientId: 'funky', clientSecret: 'psst' }
  }
}

describe('with a successful response', () => {
  beforeEach(() => {
    fetch
      .once(JSON.stringify({ accessToken: 'cryptic' }))
      .once(JSON.stringify({ acct: 'me', url: 'https://funk.town/@me' }))
  })

  it('fetches the access token', async () => {
    renderWithReduxAndRouter(<AuthorizedScreen {...props} />, { initialState })

    await wait()
    const body = JSON.parse(fetch.mock.calls[0][1].body)

    expect(fetch).toHaveBeenCalledWith(
      'https://funk.town/oauth/token',
      expect.objectContaining({ method: 'POST' })
    )
    expect(body).toMatchObject({
      client_id: 'funky',
      client_secret: 'psst',
      code: 'snazzy_code'
    })
  })

  it('fetches and stores the current user', async () => {
    const { store } = renderWithReduxAndRouter(
      <AuthorizedScreen {...props} />,
      { initialState }
    )

    await wait()

    expect(fetch).toHaveBeenCalledWith(
      'https://funk.town/api/v1/accounts/verify_credentials',
      expect.objectContaining({
        method: 'GET',
        headers: {
          map: expect.objectContaining({ authorization: 'Bearer cryptic' })
        }
      })
    )
    expect(store.getState()).toMatchObject({
      users: {
        uaccts: ['me@funk.town'],
        tokens: { 'me@funk.town': 'cryptic' },
        entities: { 'me@funk.town': {} }
      }
    })
  })

  it('displays a Loading message', async () => {
    const { getByText } = renderWithReduxAndRouter(
      <AuthorizedScreen {...props} />,
      { initialState }
    )
    const loading = getByText(/Loading/)

    expect(loading).toBeInTheDocument()
    await wait() // flushes pending promises which will cause an error
  })

  it('redirects to root', async () => {
    const { history } = renderWithReduxAndRouter(
      <AuthorizedScreen {...props} />,
      { initialState }
    )
    const redirect = jest.spyOn(history, 'replace')
    await wait()

    expect(redirect).toHaveBeenCalledWith('/')
  })
})

describe('with a failed response', () => {
  beforeEach(() => {
    fetch.mockRejectOnce(
      JSON.stringify({ error_code: 'SAD', error_description: 'bad error' })
    )
  })

  it('shows an error', async () => {
    const { getByText } = renderWithReduxAndRouter(
      <AuthorizedScreen {...props} />,
      { initialState }
    )

    await wait()
    expect(getByText(/Error/)).toBeInTheDocument()
  })
})
