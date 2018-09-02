import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'

const theme = {
  accentColor: '#10CDC6',
  dividerColor: '#E3E3E3'
}

export default class Theme extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
  }
}
