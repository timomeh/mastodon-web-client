import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { host } from 'storybook-host'

import accounts from '../../../dummies/accounts'
import { TopBar } from '../TopBar'
import CurrentUserButton from '../CurrentUserButton'

const [currentUser, ...otherUsers] = accounts

const stories = storiesOf('Window|Top Bar', module)

stories.add('Full Bar', () => (
  <TopBar currentUser={currentUser} otherUsers={otherUsers} />
))

stories
  .addDecorator(host({ height: 60, background: 'white', backdrop: true }))
  .add('Current User Button', () => (
    <CurrentUserButton user={currentUser} onClick={action('click')} />
  ))
