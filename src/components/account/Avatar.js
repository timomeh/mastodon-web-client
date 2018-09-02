import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import styled from 'react-emotion'

import AvatarPlaceholder from './AvatarPlaceholder'

export default class Avatar extends React.PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['small']),
    src: PropTypes.string.isRequired,
    uacct: PropTypes.string.isRequired
  }

  static defaultProps = {
    size: 'small'
  }

  render() {
    const { src, uacct } = this.props

    return (
      <LazyLoad
        once
        height={30}
        placeholder={<AvatarPlaceholder uacct={uacct} size={30} />}
      >
        <Image src={src} alt="" width={30} height={30} />
      </LazyLoad>
    )
  }
}

const Image = styled('img')`
  display: block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 50%;
`
