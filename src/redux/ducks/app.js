export const ADD_ENTITIES = 'app/ADD_ENTITIES'
export const STORAGE_UPDATE = 'app/STORAGE_UPDATE'
const SET_ACTIVE_URI = 'app/SET_ACTIVE_URI'
const SET_ACTIVE_UACCT = 'app/SET_ACTIVE_UACCT'

const initialState = {
  uri: null,
  uacct: null
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_URI:
      return { ...state, uri: action.uri }

    case SET_ACTIVE_UACCT:
      return { ...state, uacct: action.uacct }

    default:
      return state
  }
}

export const setActiveUri = uri => ({
  type: SET_ACTIVE_URI,
  uri
})

export const setActiveUacct = uacct => ({
  type: SET_ACTIVE_UACCT,
  uacct
})

export const addEntities = entities => ({
  type: ADD_ENTITIES,
  payload: entities
})

export const storageUpdate = storage => ({
  type: STORAGE_UPDATE,
  storage
})
