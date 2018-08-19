import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import WebFont from 'webfontloader'

import '../../globalStyles'
import configureStore from '../../configureStore'
import Router from './Router'

const { store, persistor } = configureStore()

export default class App extends React.PureComponent {
  componentDidMount() {
    WebFont.load({
      google: {
        families: ['Roboto']
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    )
  }
}
