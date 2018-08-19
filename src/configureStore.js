import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import accounts from './store/accounts'
import user from './store/user'

const reducers = {
  user,
  accounts
}

const persistConfig = {
  key: 'root',
  whitelist: ['user'],
  storage
}

export default function configureStore(initialState) {
  const middleware = [thunk]
  if (process.env.NODE_ENV === 'development') middleware.push(logger)

  const rootReducer = combineReducers(reducers)
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const enhancer = composeWithDevTools(applyMiddleware(...middleware))

  const store = createStore(persistedReducer, initialState, enhancer)
  const persistor = persistStore(store)

  return { store, persistor }
}
