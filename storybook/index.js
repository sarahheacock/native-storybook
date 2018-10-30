// looks for js files in storybook
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import './addons';

// import stories 
configure(() => {
    require('../src/atoms/ButtonPrimary/stories.tsx');
}, module)

const StorybookUI = getStorybookUI({
    port: 7007,
    host: 'localhost'
});
AppRegistry.registerComponent('NativeDemo', () => StorybookUI)