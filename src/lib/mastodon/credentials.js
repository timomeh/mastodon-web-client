import * as select from '../../redux/selectors'

export default function getCredentials(store, overrides = {}) {
  const state = store.getState()
  const uri = overrides.uri || getUri(state)
  const token = overrides.token || getToken(state)
  const client = getClient(state, overrides.uri)

  return { uri, token, client }
}

function getUri(state) {
  return select.getAppUri(state)
}

function getToken(state) {
  return select.getUsersTokensCurrent(state)
}

function getClient(state, uri) {
  return uri ? select.getClients(state)[uri] : select.getClientsCurrent(state)
}
