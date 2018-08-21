import React from 'react'
import { Provider } from 'react-redux'
import WebFont from 'webfontloader'

import '../../globalStyles'
import * as mastodonApi from '../../lib/mastodonApi'
import configureStore from '../../redux/configureStore'
import Router from './Router'

const store = configureStore()
mastodonApi.setStore(store)

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
