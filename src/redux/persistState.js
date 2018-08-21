import { storageUpdate } from './ducks/app'

const STORE_KEY = 'toot'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORE_KEY)
    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORE_KEY, serializedState)
  } catch (err) {
    console.warn('Store could not be saved.')
    console.warn(err)
  }
}

export const persistState = (store, { reducers }) => {
  store.subscribe(() => {
    const state = reducers.reduce((acc, key) => {
      acc[key] = store.getState()[key]
      return acc
    }, {})

    saveState(state)
  })

  window.addEventListener('storage', event => {
    if (event.key !== STORE_KEY && event.oldValue === event.newValue) return

    try {
      const state = JSON.parse(event.newValue)
      store.dispatch(storageUpdate(state))
    } catch (err) {
      console.warn('Storage update could not be broadcasted.')
      console.warn(err)
    }
  })
}
