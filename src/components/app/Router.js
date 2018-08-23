import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AuthRoute from './AuthRoute'
import StartScreen from './StartScreen'
import AuthorizedScreen from '../auth/AuthorizedScreen'
import UserRoot from '../user/UserRoot'

export default class Router extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route path="/authorized/:uri" component={AuthorizedScreen} />
            <AuthRoute
              path="/:uacct(.*@[^\/]+)"
              component={hasUser => (hasUser ? UserRoot : StartScreen)}
            />
            <AuthRoute
              exact
              path="/"
              component={hasUser => (hasUser ? UserRoot : StartScreen)}
            />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}
