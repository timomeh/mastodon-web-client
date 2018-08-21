export const ADD_ENTITIES = 'app/ADD_ENTITIES'
export const STORAGE_UPDATE = 'app/STORAGE_UPDATE'
const SET_ACTIVE_INSTANCE_URI = 'app/SET_ACTIVE_INSTANCE_URI'
const SET_ACTIVE_USER = 'app/SET_ACTIVE_USER'

const initialState = {
  instanceUri: null,
  user: null
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_INSTANCE_URI:
      return { ...state, instanceUri: action.instanceUri }

    case SET_ACTIVE_USER:
      return { ...state, user: action.uacct }

    default:
      return state
  }
}

export const setActiveInstanceUri = instanceUri => ({
  type: SET_ACTIVE_INSTANCE_URI,
  instanceUri
})

export const setActiveUser = uacct => ({
  type: SET_ACTIVE_USER,
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
