import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, wait, waitForElement } from 'react-testing-library'

import { setStore as setMastodonApiStore } from './lib/mastodon/api'
import fetch, { call } from './lib/mastodon/fetch-factory'
import configureStore from './redux/configure-store'

// Fetch mock
jest.mock('./lib/mastodon/fetch-factory')
beforeEach(() => {
  call.mockReset()
  fetch.mockClear()
})

// Localstorage mock
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock

// Testing Globals
global.render = render
global.fireEvent = fireEvent
global.wait = wait
global.waitForElement = waitForElement

global.renderWithRedux = function renderWithRedux(
  ui,
  { initialState, store = configureStore(initialState) } = {}
) {
  setMastodonApiStore(store)
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  }
}

global.renderWithRouter = function renderWithRouter(
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

global.renderWithReduxAndRouter = function renderWithReduxAndRouter(
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
