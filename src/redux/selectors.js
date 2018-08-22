import { createSelector } from 'reselect'

// app SliceReducer
export const getApp = state => state.app
export const getAppUri = createSelector(getApp, app => app.uri)
export const getAppUser = createSelector(getApp, app => app.uacct)

// clients SliceReducer
export const getClients = state => state.clients
export const getClientsCurrent = createSelector(
  [getClients, getAppUri],
  (clients, uri) => {
    if (!uri) return null
    return clients[uri]
  }
)

// users SliceReducer
export const getUsers = state => state.users
export const getUsersTokens = createSelector(getUsers, users => users.tokens)
export const getUsersTokensCurrent = createSelector(
  [getUsersTokens, getAppUser],
  (tokens, user) => {
    if (!user) return null
    return tokens[user]
  }
)
