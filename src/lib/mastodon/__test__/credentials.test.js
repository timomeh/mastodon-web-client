import getCredentials from '../credentials'
import configureStore from '../../../redux/configureStore'

const initialState = {
  app: { uri: 'funk.town', uacct: 'someone@funk.town' },
  users: { tokens: { 'someone@funk.town': 'someones_token' } },
  clients: { 'funk.town': 'funk', 'up.town': 'up' }
}

let store = configureStore(initialState)
const credentials = overrides => getCredentials(store, overrides)

describe('without overrides', () => {
  it('includes uri from state', () => {
    expect(credentials()).toHaveProperty('uri', 'funk.town')
  })

  it('includes token from state', () => {
    expect(credentials()).toHaveProperty('token', 'someones_token')
  })

  it('includes client from state', () => {
    expect(credentials()).toHaveProperty('client', 'funk')
  })
})

describe('with overrides', () => {
  it('includes uri from override', () => {
    expect(credentials({ uri: 'up.town' })).toHaveProperty('uri', 'up.town')
  })

  it('includes token from override', () => {
    expect(credentials({ token: 'other' })).toHaveProperty('token', 'other')
  })

  it('includes client from override', () => {
    expect(credentials({ uri: 'up.town' })).toHaveProperty('client', 'up')
  })
})
