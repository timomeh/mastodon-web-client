import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as users from '../../store/users'
import * as instances from '../../store/instances'

export class UserRoot extends React.PureComponent {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    fetchInstance: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  componentDidMount() {
    this.fetchBackgroundData()
  }

  fetchBackgroundData = () => {
    if (!this.props.user) return
    const { uacct, uri } = this.props.user

    Promise.all([this.props.fetchUser(uacct), this.props.fetchInstance(uri)])
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/" />
    }

    return <div>{this.props.user.uacct}</div>
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: users.getCurrentUser(state, ownProps.match.params.uacct)
})

const mapDispatchToProps = dispatch => ({
  fetchUser: uacct => dispatch(users.fetchUser(uacct)),
  fetchInstance: uri => dispatch(instances.fetchInstance(uri))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRoot)
