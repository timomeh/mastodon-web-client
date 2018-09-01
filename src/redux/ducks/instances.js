import api from '../../lib/mastodon/api'
import * as app from './app'

const initialState = {}

export default function instancesReducer(state = initialState, action) {
  switch (action.type) {
    case app.ADD_ENTITIES:
      return { ...state, ...action.payload.instances }

    default:
      return state
  }
}

export const fetchInstance = (uri, opts = {}) => (dispatch, getState) => {
  if (opts.cache) return Promise.resolve(getState()[uri])

  return api({ uri })
    .instance.get()
    .then(({ result, entities }) => {
      dispatch(app.addEntities(entities))
      return entities[result]
    })
}
