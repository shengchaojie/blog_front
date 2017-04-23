var path =require('path');
var webpack = require('webpack');
module.exports ={
entry: [path.resolve(__dirname, './app/main.js')],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader', // 'babel-loader' is also a legal name to reference  
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE.ENV': "development"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
