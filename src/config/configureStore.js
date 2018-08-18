import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import accounts from '../store/accounts'
import user from '../store/user'

const reducers = {
  user,
  accounts
}

export default function configureStore(initialState) {
  const middleware = [thunk]
  if (process.env.NODE_ENV === 'development') middleware.push(logger)

  const rootReducer = combineReducers(reducers)

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )

  return store
}
