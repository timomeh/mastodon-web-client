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
    const { fetchUser } = this.props

    fetchUser()
      .then(() => this.setState({ hasFetchedUser: true }))
      .catch(err => {
        console.error(err)
        this.setState({ hasFailedUser: true })
      })
  }

  callInstance = () => {
    const { fetchInstance } = this.props

    fetchInstance()
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

const mapStateToProps = state => ({
  user: state.users.entities[state.app.uacct],
  instance: state.instances[state.app.uri]
})

export default connect(
  mapStateToProps,
  { fetchUser, fetchInstance }
)(UserFetcher)
