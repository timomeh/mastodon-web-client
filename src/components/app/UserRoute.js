import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as users from '../../store/users'

export class UserRoute extends React.PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
    redirectTo: PropTypes.string,
    loggedOut: PropTypes.bool
  }

  static defaultProps = {
    redirectTo: '/'
  }

  renderRoute = props => {
    const {
      component: Component,
      isLoggedIn,
      redirectTo,
      loggedOut
    } = this.props
    const authCheck = loggedOut ? !isLoggedIn : isLoggedIn

    return authCheck ? <Component {...props} /> : <Redirect to={redirectTo} />
  }

  render() {
    const { component, isLoggedIn, redirectTo, loggedOut, ...rest } = this.props

    return <Route {...rest} render={this.renderRoute} />
  }
}

const mapStateToProps = state => ({
  isLoggedIn: users.isLoggedIn(state)
})

export default connect(mapStateToProps)(UserRoute)
