import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import * as user from '../../store/user'
import WelcomeScreen from '../welcome/WelcomeScreen'

export class Router extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          component={this.props.isLoggedIn ? WelcomeScreen : WelcomeScreen}
        />
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: user.isLoggedIn(state)
})

export default connect(mapStateToProps)(Router)
