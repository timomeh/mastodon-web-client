import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import * as users from '../../redux/ducks/users'

export class AuthorizedScreen extends React.PureComponent {
  state = {
    isLoading: true,
    isSuccess: false,
    error: null
  }

  componentDidMount() {
    const { uri } = this.props.match.params
    const { code } = queryString.parse(this.props.location.search)

    this.props.fetchUserFromCode({ uri, code })
  }

  render() {
    if (this.state.isLoading) return <div>Loading...</div>
    if (this.state.isSuccess) return <Redirect to="/" />

    return <div>{this.state.error}</div>
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserFromCode: ({ uri, code }) =>
    dispatch(users.fetchUserFromCode({ uri, code }))
})

export default connect(
  null,
  mapDispatchToProps
)(AuthorizedScreen)
