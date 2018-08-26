import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import fetch, { call } from './lib/mastodon/fetch-factory'

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
