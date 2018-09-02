import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'

const theme = {
  accentColor: '#10CDC6'
}

export default class Theme extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
  }
}
