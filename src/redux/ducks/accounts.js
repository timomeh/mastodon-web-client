import * as app from './app'

const initialState = {}

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case app.ADD_ENTITIES:
      return { ...state, ...action.payload.accounts }

    default:
      return state
  }
}
