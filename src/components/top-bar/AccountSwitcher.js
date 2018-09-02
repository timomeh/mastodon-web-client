import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

import { AccountPropTypes } from '../../lib/types'
import CurrentUserButton from './CurrentUserButton'

export default class AccountSwitcher extends React.PureComponent {
  static propTypes = {
    currentUser: AccountPropTypes.isRequired,
    otherUsers: PropTypes.arrayOf(AccountPropTypes).isRequired
  }

  render() {
    const { currentUser } = this.props

    return (
      <Container>
        <CurrentUserButton
          user={currentUser}
          onClick={this.handleCurrentUserClick}
        />
      </Container>
    )
  }
}

const Container = styled('div')`
  display: flex;
  position: relative;
  height: 100%;
  align-items: stretch;
`
