export default function getCredentials(store, overrides = {}) {
  const state = store.getState()
  const uri = overrides.uri || getUri(state)
  const token = overrides.token || getToken(state)
  const client = getClient(state, overrides.uri)

  return { uri, token, client }
}

function getUri(state) {
  return state.app.uri
}

function getToken(state) {
  return state.users.tokens[state.app.uacct]
}

function getClient(state, uri) {
  return uri ? state.clients[uri] : state.clients[state.app.uri]
}
