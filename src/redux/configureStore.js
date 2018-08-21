import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reduxBatch } from '@manaflair/redux-batch'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { loadState, persistState } from './persistState'

import app from './ducks/app'
import accounts from './ducks/accounts'
import clients from './ducks/clients'
import instances from './ducks/instances'
import users from './ducks/users'

const reducers = {
  app,
  accounts,
  clients,
  instances,
  users
}

const persistedReducers = ['users', 'clients']

export default function configureStore() {
  const middleware = [thunk]
  if (process.env.NODE_ENV === 'development') middleware.push(logger)

  const rootReducer = combineReducers(reducers)
  const enhancer = composeWithDevTools(
    reduxBatch,
    applyMiddleware(...middleware),
    reduxBatch
  )

  const initialState = loadState()

  const store = createStore(rootReducer, initialState, enhancer)
  persistState(store, { reducers: persistedReducers })

  return store
}
