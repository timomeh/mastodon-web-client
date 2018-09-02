import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { connect } from 'react-redux'

import { AccountPropTypes } from '../../lib/types'
import BarBackground from './BarBackground'
import AccountSwither from './AccountSwitcher'

export class TopBar extends React.PureComponent {
  static propTypes = {
    currentUser: AccountPropTypes.isRequired,
    otherUsers: PropTypes.arrayOf(AccountPropTypes).isRequired
  }

  render() {
    const { currentUser, otherUsers } = this.props

    return (
      <BarBackground>
        <Left>
          <AccountSwither currentUser={currentUser} otherUsers={otherUsers} />
          <Divider />
        </Left>
        <Right />
      </BarBackground>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentUacct = state.app.uacct
  const currentUser = state.users.entities[currentUacct]
  const otherUaccts = state.users.uaccts.filter(uacct => uacct !== currentUacct)
  const otherUsers = otherUaccts.map(uacct => state.users.entities[uacct])

  return {
    currentUser,
    otherUsers
  }
}

export default connect(mapStateToProps)(TopBar)

const Right = styled('div')`
  display: flex;
  flex: 1;
`

const Left = styled('div')`
  display: flex;
  flex: 0;
`

const Divider = styled('div')`
  margin-top: 1px;
  margin-bottom: 1px;
  width: 1px;
  background-color: ${props => props.theme.dividerColor};
`
