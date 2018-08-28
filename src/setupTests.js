import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

global.fetch = require('jest-fetch-mock')

// Localstorage mock
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock

beforeEach(() => {
  jest.clearAllMocks()
})
