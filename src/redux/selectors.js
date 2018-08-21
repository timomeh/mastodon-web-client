import { createSelector } from 'reselect'

// app SliceReducer
export const getApp = state => state.app
export const getAppInstanceUri = createSelector(getApp, app => app.instanceUri)
export const getAppUser = createSelector(getApp, app => app.user)

// clients SliceReducer
export const getClients = state => state.clients
export const getClientsCurrent = createSelector(
  [getClients, getAppInstanceUri],
  (clients, instanceUri) => {
    if (!instanceUri) return null
    return clients[instanceUri]
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
