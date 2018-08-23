import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as users from '../../redux/ducks/users'
import * as instances from '../../redux/ducks/instances'

export class UserDataLayer extends React.PureComponent {
  static propTypes = {
    uri: PropTypes.string.isRequired,
    uacct: PropTypes.string.isRequired,
    hasData: PropTypes.bool.isRequired,
    children: PropTypes.func
  }

  static defaultProps = {
    children: hasData => {}
  }

  componentDidMount() {
    const { uri, uacct } = this.props
    this.props.loadRelatedData({ uri, uacct })
  }

  render() {
    const { children, hasData } = this.props
    return children(hasData)
  }
}

const mapStateToProps = (state, { uri, uacct }) => {
  const instance = state.instances[uri]
  const user = state.users.entities[uacct]

  return {
    hasData: !!(instance && user)
  }
}

const mapDispatchToProps = dispatch => ({
  loadRelatedData: ({ uri, uacct }) => {
    return dispatch([users.fetchByToken({ uri }), instances.fetch(uri)])
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDataLayer)
