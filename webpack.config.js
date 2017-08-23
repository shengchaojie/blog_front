var path =require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports ={
    entry: ['babel-polyfill',path.resolve(__dirname, './app/main.js')],
    output: {
        path: path.resolve(__dirname, './build/static'),
        filename: 'bundle.js',
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
       /* new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }}),*/
        //new ExtractTextPlugin("static/css/[name].css"),    //单独使用style标签加载css并设置其路径
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
             //favicon:'./src/img/favicon.ico', //favicon路径
             filename:'../index.html',    //生成的html存放路径，相对于 path
             template:'./app/template/index.html',    //html模板路径
             inject:true,    //允许插件修改哪些内容，包括head与body
             hash:true,    //为静态资源生成hash值
             minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                 collapseWhitespace:false    //删除空白符与换行符
            }
         })
        
   ]

}
