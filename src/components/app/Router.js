import React from 'react'
import { Route, Switch } from 'react-router-dom'

import IndexRoute from './IndexRoute'
import NotFound from './NotFound'
import AuthorizedScreen from '../auth/AuthorizedScreen'

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/authorized/:uri" component={AuthorizedScreen} />
        <Route path="/:uacct(.*@[^\/]+)" component={IndexRoute} />
        <Route exact path="/" component={IndexRoute} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
