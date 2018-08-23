import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isValidDomain from 'is-valid-domain'

import api from '../../lib/mastodon/api'
import * as clients from '../../redux/ducks/clients'

export class AddUser extends React.PureComponent {
  state = {
    uri: '',
    loading: false,
    error: false
  }

  handleInputChange = event => {
    this.setState({
      uri: event.target.value,
      error: false
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const uri = this.state.uri.trim() || 'mastodon.social'
    if (!isValidDomain(uri)) {
      this.setState({ error: true })
      return
    }

    this.setState({ loading: true })

    this.props
      .createClient(uri)
      .then(client => api({ uri, client }).user.authorize())
      .catch(error => {
        console.error(error)
        this.setState({ loading: false, error: true })
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Your Instance</label>
          <input
            disabled={this.state.loading}
            value={this.state.instance}
            onChange={this.handleInputChange}
            placeholder="e.g. mastodon.social"
          />
          <div>We will use mastodon.social if you leave this blank.</div>
          <button disabled={this.state.loading}>Log in</button>
        </form>
        {this.state.error && <div>Error!</div>}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createClient: uri => dispatch(clients.createClient(uri))
})

export default connect(
  null,
  mapDispatchToProps
)(AddUser)
