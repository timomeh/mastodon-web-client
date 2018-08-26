import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import PropTypes from 'prop-types'
import querystring from 'querystring'

import * as users from '../../redux/ducks/users'

export class AuthorizedScreen extends React.PureComponent {
  static propTypes = {
    fetchUserFromCode: PropTypes.func.isRequired,
    code: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired
  }

  state = {
    isLoading: true,
    isSuccess: false,
    error: null
  }

  componentDidMount() {
    const { uri, code } = this.props

    this.props
      .fetchUserFromCode({ uri, code })
      .then(() => this.setState({ isLoading: false, isSuccess: true }))
      .catch(err => this.setState({ isLoading: false, error: 'Error!' }))
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

export default compose(
  withProps(props => ({
    uri: this.props.match.params.uri,
    code: querystring.parse(this.props.location.search).code
  })),
  connect(
    null,
    mapDispatchToProps
  )
)(AuthorizedScreen)
