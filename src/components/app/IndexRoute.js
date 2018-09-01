import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withProps, compose } from 'recompose'

import NotFound from './NotFound'
import StartScreen from './StartScreen'
import UserRoot from '../user/UserRoot'

export class IndexRoute extends React.PureComponent {
  static propTypes = {
    baseUrl: PropTypes.string.isRequired,
    hasUser: PropTypes.bool.isRequired,
    uacct: PropTypes.string
  }

  render() {
    const { hasUser, uacct, baseUrl } = this.props

    if (!hasUser) {
      return !uacct ? <StartScreen /> : <NotFound />
    }

    return <UserRoot uacct={uacct} baseUrl={baseUrl} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const { uacct: propsUacct } = ownProps.match.params
  const defaultUacct = state.users.uaccts[0]
  const uacct = propsUacct || defaultUacct

  return {
    uacct,
    hasUser: state.users.uaccts.includes(uacct)
  }
}

export default compose(
  withProps(props => ({ baseUrl: props.match.url })),
  connect(mapStateToProps)
)(IndexRoute)
