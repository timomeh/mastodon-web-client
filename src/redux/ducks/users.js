import api from '../../lib/mastodon/api'
import * as app from './app'

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

export const fetchUserFromCode = ({ uri, code }) => dispatch => {
  return api({ uri })
    .user.token(code)
    .then(({ accessToken: token }) => {
      return Promise.all([token, dispatch(fetchUser({ uri, token }))])
    })
    .then(([token, user]) => {
      dispatch([addUser(user.uacct), setToken(user.uacct, token)])
      return user
    })
}

export const fetchUser = ({ uri, token } = {}) => dispatch => {
  return api({ uri, token })
    .user.get()
    .then(({ result, entities }) => {
      dispatch(app.addEntities({ ...entities, users: entities.accounts }))
      return entities.accounts[result]
    })
}
