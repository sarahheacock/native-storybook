import { configure, addDecorator } from "@storybook/react";
// import { setOptions } from '@storybook/addon-options';

// import { withKnobs, select } from "@storybook/addon-knobs/react";
// import backgrounds from "@storybook/addon-backgrounds";
import { CenterDecorator } from '../src/base/CenterDecorator';

// iframe wrapper
addDecorator(CenterDecorator);


// automatically import all files ending in *.stories.js
const req = require.context("../src/stories", true, /index.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);