import { configure, addDecorator } from '@storybook/react'
import { checkA11y } from '@storybook/addon-a11y'
import backgrounds from '@storybook/addon-backgrounds'
import { setOptions } from '@storybook/addon-options'

import '../src/global-styles'

setOptions({
  name: 'mastodon-web',
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/
})
addDecorator(backgrounds([{ name: 'page', value: '#FFFFFF', default: true }]))
addDecorator(checkA11y)

const req = require.context('../src/components', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
