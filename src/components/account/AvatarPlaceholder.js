import React from 'react'
import PropTypes from 'prop-types'
import ColorHash from 'color-hash'
import styled from 'react-emotion'

export default class AvatarPlaceholder extends React.PureComponent {
  static propTypes = {
    uacct: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  }

  getColor = () => {
    const { uacct } = this.props
    const colorHash = new ColorHash({ saturation: 0.4, lightness: 0.7 })

    return colorHash.hex(uacct)
  }

  render() {
    const { uacct, size } = this.props

    return (
      <Dot size={size} color={this.getColor()}>
        {uacct[0].toUpperCase()}
      </Dot>
    )
  }
}

const Dot = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  font-weight: 500;
  font-size: 14px;
`
