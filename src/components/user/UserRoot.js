import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import HomeTimeline from '../timeline/HomeTimeline'

export default class UserRoot extends React.PureComponent {
  static propTypes = {
    baseUrl: PropTypes.string.isRequired,
    uacct: PropTypes.string.isRequired
  }

  render() {
    const { baseUrl, uacct } = this.props

    return (
      <div data-testid="user-root">
        <h1>{uacct}</h1>
        <Route exact path={`${baseUrl}/`} component={HomeTimeline} />
      </div>
    )
  }
}
