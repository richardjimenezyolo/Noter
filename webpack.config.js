const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'www'),
        compress: true,
        port: 5000
    },
    module: {
        rules: [
            // ... other rules
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ],
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'www')
    }
}