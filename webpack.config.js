var path =require('path');
var webpack = require('webpack');

module.exports ={
    entry: ['babel-polyfill',path.resolve(__dirname, './app/main.js')],
    output: {
        path: path.resolve(__dirname, './build/static'),
        filename: 'bundle.[hash].js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader', // 'babel-loader' is also a legal name to reference  
            query: {
                presets: ['react', 'es2015', "stage-0"],
                plugins:[
                    ['import', { libraryName: 'antd', style: 'css' }]
                ]
            }
        },
        {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/build/'),
        historyApiFallback: true,
        hot: true,
        inline: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE.ENV': "development"
        }),
        new webpack.HotModuleReplacementPlugin(),
        /*new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          })
        */
   ]

}
