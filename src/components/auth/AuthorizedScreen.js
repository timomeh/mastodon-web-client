import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import PropTypes from 'prop-types'
import querystring from 'querystring'

import { fetchUserFromCode } from '../../redux/ducks/users'
import { setUacct } from '../../redux/ducks/app'

export class AuthorizedScreen extends React.PureComponent {
  static propTypes = {
    setUacct: PropTypes.func.isRequired,
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
      .then(user => this.props.setUacct(user.uacct))
      .then(() => this.setState({ isLoading: false, isSuccess: true }))
      .catch(err => this.setState({ isLoading: false, error: 'Error!' }))
  }

  render() {
    if (this.state.isLoading) return <div>Loading...</div>
    if (this.state.isSuccess) return <Redirect to="/" />

    return <div>{this.state.error}</div>
  }
}

export default compose(
  withProps(props => ({
    uri: props.match.params.uri,
    code: querystring.parse(props.location.search.replace(/^\?/, '')).code
  })),
  connect(
    null,
    { fetchUserFromCode, setUacct }
  )
)(AuthorizedScreen)
