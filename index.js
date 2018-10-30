import { AppRegistry } from 'react-native';

import App from './src/containers/App.tsx';
AppRegistry.registerComponent('NativeDemo', () => App);

// import { AppRegistry } from 'react-native';
// import { getStorybookUI, configure } from '@storybook/react-native';
// import './storybook/addons';

// // import stories 
// configure(() => {
//     require('./src/stories');
// }, module)

// const StorybookUI = getStorybookUI({
//     port: 7007,
//     host: 'localhost'
// });
// AppRegistry.registerComponent('NativeDemo', () => StorybookUI)