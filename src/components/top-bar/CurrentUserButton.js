import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

import { AccountPropTypes } from '../../lib/types'
import UserSnip from './UserSnip'
import Icon from '../shared/Icon'

export default class CurrentUserButton extends React.PureComponent {
  static propTypes = {
    user: AccountPropTypes.isRequired,
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  render() {
    const { onClick, user } = this.props

    return (
      <ClickArea onClick={onClick} aria-label="Change User">
        <UserSnip user={user} />
        <div css={{ width: 20 }} />
        <Icon name="shuffle" size={16} fill="#383838" />
      </ClickArea>
    )
  }
}

const ClickArea = styled('button')`
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`
