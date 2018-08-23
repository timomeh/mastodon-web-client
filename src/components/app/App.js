import React from 'react'
import { Provider } from 'react-redux'
import WebFont from 'webfontloader'

import '../../globalStyles'
import { setStore as setMastodonApiStore } from '../../lib/mastodon/api'
import configureStore from '../../redux/configureStore'

import Router from './Router'

const store = configureStore()
setMastodonApiStore(store)

export default class App extends React.PureComponent {
  componentDidMount() {
    WebFont.load({
      google: {
        families: ['Roboto:400,500,700']
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
