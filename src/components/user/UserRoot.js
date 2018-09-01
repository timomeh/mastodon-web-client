import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'

import { setUacct, setUri } from '../../redux/ducks/app'
import UserFetcher from './UserFetcher'
import HomeTimeline from '../timeline/HomeTimeline'

export class UserRoot extends React.PureComponent {
  static propTypes = {
    setApp: PropTypes.func.isRequired,
    baseUrl: PropTypes.string.isRequired,
    uacct: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired
  }

  componentDidMount() {
    const { setApp, uri, uacct } = this.props

    setApp({ uri, uacct })
  }

  render() {
    const { baseUrl, uacct, uri } = this.props

    return (
      <div data-testid="user-root">
        <UserFetcher uacct={uacct} uri={uri}>
          <h1>{uacct}</h1>
          <Route exact path={`${baseUrl}/`} component={HomeTimeline} />
        </UserFetcher>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setApp: ({ uri, uacct }) => dispatch([setUacct(uacct), setUri(uri)])
})

export default compose(
  withProps(props => ({ uri: props.uacct.split('@')[1] })),
  connect(
    null,
    mapDispatchToProps
  )
)(UserRoot)
