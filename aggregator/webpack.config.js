const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 抽离css的插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); /* 插件需要引入  */
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development', /* production  */
    entry:{
        index: './src/entrys/index.js',
        back:'./src/entrys/back.js'
    },
    output:{
        path: path.resolve(__dirname , 'dist'),
        filename:'js/[name].[hash:8].js'
    },
    module:{
        rules:[
            {   /* 处理css 一般都不会写 css 文件 应该使用 sass */
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {   /* 处理sass 文件 */
                test: /\.scss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader}, /* 将css文件抽离出来 style-loader 不能一起使用 */
                    {loader: "css-loader"},
                    {loader: 'sass-loader', options: { sourceMap: true } } /*需要sass-node*/
                ]
            },
            {   /* 处理图片 */
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            name:'[name][hash:12].[ext]',
                            outputPath: 'static/images/',
                            esModule: false /* 旧版本处理 */
                        }
                    }
                ],
                type: `javascript/auto` /* 旧版本处理 */
            },
            {   /* 处理HTML中的图片 */
                test: /\.html$/i,
                use: ['html-loader']  /* img 图片不能添加 srcset 属性 不然就报错 */
            },
            {   /* 处理字体 */
                test: /\.(eot|woff2?|ttf|svg)$/,
                include: [
                    path.resolve(__dirname, './src/static/fonts')
                ],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name][hash:10].min.[ext]',
                            limit: 5000,
                            outputPath: 'static/fonts/',
                            esModule: false /* 旧版本处理 */
                        }
                    }
                ],
                type: `javascript/auto` /* 旧版本处理 */
            },
            {   /* JSX翻译 */
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']  /* npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react   */
                    }
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ 
            filename: 'css/[name]-[hash].css',
            chunkFilename:'[name].css'
        }),
        new HtmlWebpackPlugin({
            filename:'index.html', 
            template: "./src/views/index.html",
            inject: true,
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({  
            filename: 'back.html',
            template: 'src/views/back.html',
            inject: true,
            chunks: ['back']
        })
    ],
    devServer:{  /* 开发服务器 devServer : 用来自动化(自动编译、自动打开/刷新浏览器、) */
        static: {
            /* 服务器目录 */
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true, /* 解决 BrowserRouter 刷新问题 */
        compress: true, /* 启用 gzip 压缩 */
        port: 30999, /* 端口号 */
        hot: true, //开发热替换
        liveReload:true,
        open: ['/index.html']
    },
}