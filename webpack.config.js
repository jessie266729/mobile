var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    'main': './src/main.js',
    'jquery': path.resolve(__dirname, './src/asset/plugin/jquery.min.js'),
    'vendor': ['swiper','underscore','mescroll.js','video.js','./src/common-component/util/util.js','./src/api/Api.js']
  },
  output: {
    path: path.resolve(__dirname, './built'),
    filename: 'js/[name].js?[chunkhash]',
    chunkFilename: 'js/[name].js?[chunkhash]',
    publicPath: '/built/'
  },
  resolve: {
    modules: [ 'node_modules' ]
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','stage-0']
        }
      },
      {
        test: /\.html$/,
        loader: "art-template-loader"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css-loader!sass-loader")
      },
      {
        test: /\.png|jpg|gif|jpeg$/,
        loader: "url-loader",
        query: {
          // 图片大小限制 单位b
          limit: 8192,
          // 生成的文件的存放目录
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.eot|svg|ttf|woff|woff2$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development'), //production & development,
        'PUBLIC_PATH': JSON.stringify('http://127.0.0.1'),
        'PAGE_SIZE': 10
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor','manifest']
    }),
    new ExtractTextPlugin({ filename: "app.css?[chunkhash]", allChunks: true }),
    // 按引用频度来排序 ID，以便达到减少文件大小的效果
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: '../built/index.html', //生成的html存放路径，相对于path
      template: './src/index.html', //html模板路径
      inject: true, //js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      chunks: ['manifest', 'jquery', 'vendor', 'main'],
      chunksSortMode: function (chunk1, chunk2) {
        var order = ['manifest', 'jquery', 'vendor', 'main'];
        var order1 = order.indexOf(chunk1.names[0]);
        var order2 = order.indexOf(chunk2.names[0]);
        return order1 - order2;
      },
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    })
  ]
};