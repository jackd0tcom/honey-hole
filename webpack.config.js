const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    entry: {
        'honey-hole-admin': './src/admin/index.js',
        'honey-hole-frontend': './src/frontend/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'admin/js'),
        filename: '[name].js'
    },
    externals: {
        ...defaultConfig.externals,
        jquery: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM'
    }
}; 