const ADD_ACCOUNTS = 'accounts/add'

const initialState = {}

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNTS:
      return {
        ...state,
        ...action.accounts
      }

    default:
      return state
  }
}

export function addAccounts(accounts) {
  return {
    type: ADD_ACCOUNTS,
    accounts
  }
}
