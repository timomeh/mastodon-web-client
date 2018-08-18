import React from 'react'
import WebFont from 'webfontloader'

export default class FontLoader extends React.PureComponent {
  componentDidMount() {
    WebFont.load({
      google: {
        families: ['Roboto']
      }
    })
  }

  render() {
    return this.props.children
  }
}
