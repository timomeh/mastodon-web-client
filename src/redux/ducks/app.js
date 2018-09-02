export const ADD_ENTITIES = 'app/ADD_ENTITIES'
export const STORAGE_UPDATE = 'app/STORAGE_UPDATE'
const SET_URI = 'app/SET_URI'
const SET_UACCT = 'app/SET_UACCT'

const initialState = {
  uri: null,
  uacct: null
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_URI:
      return { ...state, uri: action.uri }

    case SET_UACCT:
      return { ...state, uacct: action.uacct }

    default:
      return state
  }
}

export const setApp = ({ uri, uacct }) => dispatch => {
  dispatch([setUri(uri), setUacct(uacct)])
}

export const setUri = uri => ({
  type: SET_URI,
  uri
})

export const setUacct = uacct => ({
  type: SET_UACCT,
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
