import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-testing-library'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import configureStore from '../redux/configure-store'
import { setStore as setMastodonApiStore } from '../lib/mastodon/api'

export const renderWithRedux = function renderWithRedux(
  ui,
  { initialState, store = configureStore(initialState) } = {}
) {
  setMastodonApiStore(store)
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  }
}

export const renderWithRouter = function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  }
}

export const renderWithReduxAndRouter = function renderWithReduxAndRouter(
  ui,
  {
    initialState,
    store = configureStore(initialState),
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  setMastodonApiStore(store)
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    history,
    store
  }
}

export const generateAccount = ({ uri, acct }) => ({
  id: '123',
  username: acct,
  acct,
  uacct: acct + '@' + uri,
  uri,
  displayName: 'A Person',
  locked: false,
  bot: false,
  createdAt: '2016-11-02T06:15:19.898Z',
  note: '\u003cp\u003eI am a dummy person.\u003c/p\u003e',
  url: `https://${uri}/@chrispop`,
  avatar: `https://files.${uri}/accounts/avatars/000/007/797/original/cd4261e31c267aca.jpg`,
  avatarStatic: `https://files.${uri}/accounts/avatars/000/007/797/original/cd4261e31c267aca.jpg`,
  header: `https://files.${uri}/accounts/headers/000/007/797/original/72c162f38e83b909.jpg`,
  headerStatic: `https://files.${uri}/accounts/headers/000/007/797/original/72c162f38e83b909.jpg`,
  followersCount: 123,
  followingCount: 456,
  statusesCount: 7890,
  emojis: [],
  fields: [
    {
      name: 'Foo',
      value:
        '\u003ca href="https://funk.town/" rel="me nofollow noopener" target="_blank"\u003e\u003cspan class="invisible"\u003ehttps://\u003c/span\u003e\u003cspan class=""\u003efunk.town/\u003c/span\u003e\u003cspan class="invisible"\u003e\u003c/span\u003e\u003c/a\u003e'
    }
  ]
})
