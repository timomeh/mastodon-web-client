import { injectGlobal } from 'emotion'

injectGlobal`
  html {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
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

  button {
    display: flex;
    border: none;
    padding: 0;
    margin: 0;
    text-decoration: none;
    background: none;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    text-align: inherit;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
`
