import { injectGlobal } from 'emotion'

injectGlobal`
  html {
    font-family: 'Roboto', sans-serif;
  }

  html, body, #root {
    height: 100%;
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
