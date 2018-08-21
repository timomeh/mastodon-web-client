import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import UserRoute from './UserRoute'
// import UserRoot from '../user/UserRoot'
import AuthorizedScreen from '../user/AuthorizedScreen'
import AddFirstUserScreen from '../user/AddFirstUserScreen'

export default class Router extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route
              path="/authorized/:instanceUri"
              component={AuthorizedScreen}
            />
            <Route path="/start" component={AddFirstUserScreen} />
            {/* <UserRoute path="/start" component={AddFirstUserScreen} loggedOut />
            <UserRoute
              path="/:uacct?"
              component={UserRoot}
              redirectTo="/start"
            /> */}
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}
