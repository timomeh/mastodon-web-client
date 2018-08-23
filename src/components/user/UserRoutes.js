import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import HomeTimeline from '../timeline/HomeTimeline'

export default class UserRoutes extends React.PureComponent {
  static propTypes = {
    baseUrl: PropTypes.string.isRequired
  }

  render() {
    const { baseUrl } = this.props

    return (
      <React.Fragment>
        <Route exact path={`${baseUrl}/`} component={HomeTimeline} />
        <Route path={`${baseUrl}/local`} component={HomeTimeline} />
      </React.Fragment>
    )
  }
}
