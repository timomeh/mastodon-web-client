import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { checkA11y } from '@storybook/addon-a11y'
import backgrounds from '@storybook/addon-backgrounds'
import { setOptions } from '@storybook/addon-options'

import '../src/global-styles'
import Theme from '../src/components/app/Theme'

setOptions({
  name: 'mastodon-web',
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/
})
addDecorator(backgrounds([{ name: 'page', value: '#FFFFFF', default: true }]))
addDecorator(checkA11y)
addDecorator(story => <Theme>{story()}</Theme>)

const req = require.context('../src/components', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
