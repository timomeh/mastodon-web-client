import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as clients from '../../redux/ducks/clients'

export class AddUser extends React.PureComponent {
  state = {
    instanceUri: '',
    loading: false,
    error: false
  }

  handleInputChange = event => {
    this.setState({
      instanceUri: event.target.value,
      error: false
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const instanceUri = this.state.instanceUri || 'mastodon.social'
    this.setState({ loading: true })

    this.props.createClientAndRedirect(instanceUri).catch(error => {
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
  createClientAndRedirect: instanceUri =>
    dispatch(clients.createAndRedirect(instanceUri))
})

export default connect(
  null,
  mapDispatchToProps
)(AddUser)
