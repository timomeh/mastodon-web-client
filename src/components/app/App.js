import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import WebFont from 'webfontloader'

import '../../global-styles'
import { setStore as setMastodonApiStore } from '../../lib/mastodon/api'
import configureStore from '../../redux/configure-store'

import Router from './Router'
import Theme from './Theme'

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
        <BrowserRouter>
          <Theme>
            <Router />
          </Theme>
        </BrowserRouter>
      </Provider>
    )
  }
}
