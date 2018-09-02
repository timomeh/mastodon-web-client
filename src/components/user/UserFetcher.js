import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchUser } from '../../redux/ducks/users'
import { fetchInstance } from '../../redux/ducks/instances'
import { AccountPropTypes, InstancePropTypes } from '../../lib/types'

const UserFetcherContext = React.createContext()

class UserFetcher extends React.PureComponent {
  static Consumer = UserFetcherContext.Consumer

  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    fetchInstance: PropTypes.func.isRequired,
    uacct: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    user: AccountPropTypes,
    instance: InstancePropTypes,
    children: PropTypes.node
  }

  constructor(props) {
    super(props)

    this.state = {
      hasUser: !!props.user,
      hasInstance: !!props.instance,
      hasFetchedUser: false,
      hasFetchedInstance: false,
      hasFailedUser: false,
      hasFailedInstance: false
    }
  }

  componentDidMount() {
    this.callUser()
    this.callInstance()
  }

  callUser = () => {
    const { fetchUser, uri, token } = this.props

    fetchUser({ uri, token })
      .then(() => this.setState({ hasFetchedUser: true }))
      .catch(err => {
        console.error(err)
        this.setState({ hasFailedUser: true })
      })
  }

  callInstance = () => {
    const { fetchInstance, uri } = this.props

    fetchInstance(uri)
      .then(() => this.setState({ hasFetchedInstance: true }))
      .catch(err => {
        console.error(err)
        this.setState({ hasFailedInstance: true })
      })
  }

  render() {
    return (
      <UserFetcherContext.Provider value={this.state}>
        {this.props.children}
      </UserFetcherContext.Provider>
    )
  }
}

const mapStateToProps = (state, { uacct, uri }) => ({
  token: state.users.tokens[uacct],
  user: state.users.entities[uacct],
  instance: state.instances[uri]
})

export default connect(
  mapStateToProps,
  { fetchUser, fetchInstance }
)(UserFetcher)
