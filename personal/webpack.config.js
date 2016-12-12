var path = require('path');
var webpack = require('webpack');

// 开发环境
var isDev = function() {
  return process.env.NODE_ENV.trim() === 'development';
};
// 生产环境
var isProd = function() {
  return process.env.NODE_ENV.trim() === 'production';
};

var app_path = path.resolve(__dirname,'app');
var dist_path = isDev()?path.resolve(__dirname,'dist'):path.resolve(__dirname,'build');
var node_modules_dir = path.resolve(__dirname,'node_modules');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');//webpack插件
// var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss = require('precss');
var postcss = require('postcss-loader');
var cssnext = require('cssnext');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');



module.exports = {
  entry:{
    'main':path.resolve(app_path,'main.js'),
  },
  output:{
    path:path.resolve(dist_path),
    filename:'static/js/[name].js',
    publicPath:isDev()?'/intro/personal/dist/':'/intro/personal/build/'
  },
  resolve:{
    extensions:['','.js','.jsx'],
    alias:{
      'react':path.resolve(node_modules_dir, 'react/dist/react.min.js'),
      'react-dom':path.resolve(node_modules_dir, 'react-dom/dist/react-dom.min.js'),
      'zepto':path.resolve(__dirname, 'app/static/js/zepto.js')
    },
    // externals:{
    //   'zepto':'zepto'
    // }
  },
  module:{
    noParse:['react','react-dom','zepto'],
    loaders:[
      {
        test:/\.jsx?$/,
        loader:'babel',
        exclude:/node_modules/,
        query:{
          presets:['es2015','stage-2','react']
        }
      },
      {
        test:/\.css$/,
        exclude:/node_modules/,
        loader:ExtractTextPlugin.extract('style-loader','css!postcss')
      },
      {
        test:/\.scss$/,
        exclude:/node_modules/,
        loader:ExtractTextPlugin.extract('style-loader','css!postcss!sass')
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=./static/img/[hash:6].[ext]',
      },
      // {
      //   test: require.resolve('zepto'),  // 此loader配置项的目标是NPM中的jquery
      //   loader: 'expose?$!expose?Zepto', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
      // },
    ]
  },
  postcss:function(){
    return [autoprefixer,cssnext,precss,cssnano]
  },
  plugins:getPlugins(),
}

function getPlugins(){
  var plugins = [
    new ExtractTextPlugin('static/css/pages.css?[hash:4]'),
    new webpack.ProvidePlugin({
      $:'zepto',
      Zepto:'zepto',
      'window.Zepto':'zepto',
      'window.$':'zepto'
    }),
    new HtmlWebpackPlugin({
      title:'lvzhaodi',
      template:path.resolve(app_path,'./pages/index.html'),
      filename:path.resolve(dist_path,'index.html'),
      inject:true,
      chunks:['main']
    }),

    // new CleanPlugin(['dist', 'build']),
    // new webpack.HotModuleReplacementPlugin(),
    // new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
  ];

  if (isProd()) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
          comments: false,
        },
        compress: {
          warnings: false
        }
      })
    );
  }
  return plugins;
}
console.log(module.exports.plugins + '________')
