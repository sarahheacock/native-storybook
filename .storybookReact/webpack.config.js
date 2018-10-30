const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
    console.log(JSON.stringify(defaultConfig, null, 4));
    // defaultConfig.mode = "development";
    const rules = [{
        test: /\.(ts|tsx)?$/,
        use: [{
            loader: 'awesome-typescript-loader',
            options: {
                configFileName: path.resolve(__dirname, './tsconfig.json'),
            }
        }],
        exclude: /node_modules/
    }];

    rules.forEach(rule => {
        defaultConfig.module.rules.push(rule);
    })

    // replace @storybook/react-native with @storybook/react
    defaultConfig.resolve.alias['@storybook/react-native'] = path.resolve(__dirname, '../node_modules/@storybook/react');
    defaultConfig.resolve.alias['react-native$'] = 'react-native-web';

    // TODO: determine which plugin we want to use for style
    defaultConfig.resolve.extensions = ['.web.js', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'];
    return defaultConfig;
};