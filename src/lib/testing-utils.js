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
