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
