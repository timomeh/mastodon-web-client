const { injectBabelPlugin } = require('react-app-rewired')
const emotionConfig = require('../emotion.config')

module.exports = function override(config, env) {
  config = injectBabelPlugin(['emotion', emotionConfig], config)
  return config
}
