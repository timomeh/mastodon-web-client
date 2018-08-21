import api from '../../lib/mastodonApi'
import * as app from './app'
import * as select from '../selectors'

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

export const createClient = instanceUri => (dispatch, getState) => {
  const existingClient = select.getClients(getState())[instanceUri]
  if (existingClient) return Promise.resolve(existingClient)

  return api(instanceUri)
    .apps.create()
    .then(({ result, entities }) => {
      dispatch([app.addEntities(entities), app.setActiveInstanceUri(result)])
      return result
    })
}

export const createAndRedirect = instanceUri => dispatch => {
  return dispatch(createClient(instanceUri)).then(() =>
    api(instanceUri).oauth.authorize()
  )
}
