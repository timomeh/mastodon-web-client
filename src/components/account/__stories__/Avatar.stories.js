import React from 'react'
import { storiesOf } from '@storybook/react'

import accounts from '../../../dummies/accounts'
import Avatar from '../Avatar'
import AvatarPlaceholder from '../AvatarPlaceholder'

const stories = storiesOf('Account|Avatar', module)

stories.add('small', () => (
  <Avatar
    size="small"
    src={accounts[0].avatarStatic}
    uacct={accounts[0].uacct}
  />
))

stories.add('placeholder', () => (
  <AvatarPlaceholder size={30} uacct={accounts[0].uacct} />
))
