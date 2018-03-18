const path = require('path');
const webpack = require('webpack');

const config = {
  entry: [path.join(__dirname, 'src', 'index.js')],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    })
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_moduels/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: false,
            presets: ['es2015', 'stage-2', 'react']
          }
        }
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader?pretty&exports=false']
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    publicPath: '/assets/',
    contentBase: [path.join(__dirname, 'src'), path.join(__dirname, 'assets')],
    watchContentBase: true,
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    https: false,
    before: app => {
      app.get('/', (req, res) => {
        res.render(path.join(__dirname, 'views/index.pug'));
      });
    }
  }
};

module.exports = config;
