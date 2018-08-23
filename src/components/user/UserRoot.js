import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as app from '../../redux/ducks/app'

import UserDataLayer from './UserDataLayer'
import UserRoutes from './UserRoutes'

export class UserRoot extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.object,
    hasPrepared: PropTypes.bool.isRequired,
    setActiveUserAndUri: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log(this.props.match)
    if (this.props.user) {
      const { uacct, uri } = this.props.user
      this.props.setActiveUserAndUri({ uacct, uri })
    }
  }

  render() {
    if (!this.props.user) {
      return <div>Don't know that user</div>
    }

    if (!this.props.hasPrepared) return null

    const { url } = this.props.match
    const { uri, uacct } = this.props.user

    return (
      <UserDataLayer uri={uri} uacct={uacct}>
        {hasData => (hasData ? <UserRoutes baseUrl={url} /> : 'Loading...')}
      </UserDataLayer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { uacct: setUacct } = ownProps.match.params
  const defaultUacct = state.users.uaccts[0]
  const uacct = setUacct || defaultUacct

  return {
    user: state.users.entities[uacct],
    hasPrepared: state.app.uacct === uacct
  }
}

const mapDispatchToProps = dispatch => ({
  setActiveUserAndUri: ({ uacct, uri }) => {
    return dispatch([app.setActiveUri(uri), app.setActiveUacct(uacct)])
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRoot)
