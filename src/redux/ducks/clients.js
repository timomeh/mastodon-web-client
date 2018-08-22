import api from '../../lib/mastodon/api'
import * as app from './app'
import { getClients } from '../selectors'

const initialState = {}

export default function clientsReducer(state = initialState, action) {
  switch (action.type) {
    case app.STORAGE_UPDATE:
      return { ...action.storage.clients }

    case app.ADD_ENTITIES:
      return { ...state, ...action.payload.clients }

    default:
      return state
  }
}

export const createClient = uri => (dispatch, getState) => {
  const existing = getClients(getState())[uri]
  if (existing) return Promise.resolve(existing)

  return api({ uri })
    .apps.create()
    .then(({ result, entities }) => {
      dispatch([app.addEntities(entities), app.setActiveUri(result)])
      return entities[result]
    })
}
