import { createSelector } from 'reselect'

const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export const getStore = state => state.user

export const isLoggedIn = createSelector(
  getStore,
  state => !!state
)
