import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

export class UserRoute extends React.PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    hasUser: PropTypes.bool.isRequired
  }

  renderRoute = props => {
    const { component, hasUser } = this.props
    const Component = component(hasUser)

    return <Component {...props} />
  }

  render() {
    const { component, isLoggedIn, ...rest } = this.props

    return <Route {...rest} render={this.renderRoute} />
  }
}

const mapStateToProps = state => ({
  hasUser: !!state.users.uaccts.length
})

export default connect(mapStateToProps)(UserRoute)
