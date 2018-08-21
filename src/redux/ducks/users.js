import api from '../../lib/mastodonApi'
import * as app from './app'
import * as users from './users'

const SET_TOKEN = 'users/SET_TOKEN'
const ADD_USER = 'users/ADD_USER'

const initialState = {
  uaccts: [],
  tokens: {},
  entities: {}
}

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case app.STORAGE_UPDATE:
      return { ...action.storage.users }

    case app.ADD_ENTITIES:
      const entities = { ...state.entities, ...action.payload.users }
      return { ...state, entities }

    case ADD_USER:
      const uaccts = [...state.uaccts, action.uacct]
      return { ...state, uaccts }

    case SET_TOKEN:
      const tokens = { ...state.tokens, [action.uacct]: action.token }
      return { ...state, tokens }

    default:
      return state
  }
}

export const addUser = uacct => ({
  type: ADD_USER,
  uacct
})

export const setToken = (uacct, token) => ({
  type: SET_TOKEN,
  uacct,
  token
})

export const fetchUserFromCode = ({ instanceUri, code }) => dispatch => {
  return api(instanceUri)
    .oauth.token(code)
    .then(({ accessToken: token }) => {
      return Promise.all([
        token,
        dispatch(fetchByToken({ instanceUri, token }))
      ])
    })
    .then(([token, user]) => {
      dispatch(setToken(user.uacct, token))
      return user
    })
}

export const fetchByToken = ({ instanceUri, token }) => dispatch => {
  return api(instanceUri)
    .accounts.verifyCredentials(token)
    .then(({ result, entities }) => {
      dispatch([
        addUser(result),
        app.addEntities({ ...entities, users: entities.accounts }),
        app.setActiveUser(result)
      ])
      return entities.accounts[result]
    })
}
