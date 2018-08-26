module.exports = {
  linters: {
    '**/*.+(js|json|md)': ['npm run lint -- --fix', 'git add']
  }
}
