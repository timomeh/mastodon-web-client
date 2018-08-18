import React from 'react'

import { injectGlobal } from 'emotion'

injectGlobal`
  html {
    font-family: 'Roboto', sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }
`

export default class GlobalStyles extends React.PureComponent {
  render() {
    return this.props.children
  }
}
