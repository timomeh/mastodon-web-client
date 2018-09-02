import React from 'react'
import PropTypes from 'prop-types'

import icons from '../../icons.js'

export default class Icon extends React.PureComponent {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(icons)).isRequired,
    size: PropTypes.number
  }

  static defaultProps = {
    size: 24
  }

  render() {
    const { name, size, ...rest } = this.props

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        css={{ display: 'block' }}
        {...rest}
      >
        {icons[name].path}
      </svg>
    )
  }
}
