const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
    const rules = [{
        test: /\.(ts|tsx)?$/,
        use: [{
            loader: 'babel-loader',
        },
        {
            loader: 'awesome-typescript-loader',
            options: {
                configFileName: path.resolve(__dirname, './tsconfig.json'),
            }
        }],
    }];

    rules.forEach(rule => {
        defaultConfig.module.rules.push(rule);
    })

    // TODO: determine which plugin we want to use for style
    defaultConfig.resolve.extensions.push(".ts", ".tsx");
    return defaultConfig;
};