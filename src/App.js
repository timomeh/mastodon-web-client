import React from 'react'
import GlobalStyles from './components/app/GlobalStyles'
import FontLoader from './components/app/FontLoader'
import Router from './components/app/Router'

export default class App extends React.PureComponent {
  render() {
    return (
      <GlobalStyles>
        <FontLoader>
          <Router />
        </FontLoader>
      </GlobalStyles>
    )
  }
}
