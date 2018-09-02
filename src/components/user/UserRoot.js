import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'

import { setApp } from '../../redux/ducks/app'

import UserFetcher from './UserFetcher'
import HomeTimeline from '../timeline/HomeTimeline'
import TopBar from '../top-bar/TopBar'

export class UserRoot extends React.PureComponent {
  static propTypes = {
    setApp: PropTypes.func.isRequired,
    baseUrl: PropTypes.string.isRequired,
    uacct: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired
  }

  state = {
    isPrepared: false
  }

  componentDidMount() {
    const { setApp, uacct, uri } = this.props
    setApp({ uacct, uri })
    this.setState({ isPrepared: true })
  }

  render() {
    const { isPrepared } = this.state
    const { baseUrl } = this.props

    if (!isPrepared) return null

    return (
      <UserFetcher>
        <TopBar />
        <Route exact path={`${baseUrl}/`} component={HomeTimeline} />
      </UserFetcher>
    )
  }
}

export default compose(
  withProps(props => ({ uri: props.uacct.split('@')[1] })),
  connect(
    null,
    { setApp }
  )
)(UserRoot)
