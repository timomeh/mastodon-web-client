import React from 'react'
import styled from 'react-emotion'

import { AccountPropTypes } from '../../lib/types'
import Avatar from '../account/Avatar'

export default class UserSnip extends React.PureComponent {
  static propTypes = {
    user: AccountPropTypes.isRequired
  }

  render() {
    const { user } = this.props

    return (
      <div css={{ display: 'flex', alignItems: 'center' }}>
        <Avatar size="small" src={user.avatarStatic} uacct={user.uacct} />
        <div css={{ marginLeft: 10 }}>
          <PrimaryText>@{user.acct}</PrimaryText>
          <SecondaryText>{user.uri}</SecondaryText>
        </div>
      </div>
    )
  }
}

const PrimaryText = styled('div')`
  color: #414141;
  font-weight: 600;
  font-size: 0.875rem;
`

const SecondaryText = styled('div')`
  color: #666666;
  font-size: 0.75rem;
`
