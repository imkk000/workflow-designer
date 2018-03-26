const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const __srcdir = path.join(__dirname, 'src')

module.exports = {
  entry: {
    app: path.join(__srcdir, 'js', 'index.js'),
    style: path.join(__srcdir, 'scss', 'app.scss')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  plugins: [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()],
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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: false,
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
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
      }
    ]
  },
  resolve: {
    extensions: ['.js', 'scss']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: '/assets/',
    contentBase: [path.join(__srcdir), path.join(__dirname, 'assets'), path.join(__dirname, 'views')],
    watchContentBase: true,
    port: 8888,
    host: '0.0.0.0',
    hot: true,
    https: false,
    before: (app) => {
      app.get('/', (req, res) => {
        res.render(path.join(__dirname, 'views', 'index.pug'))
      })
    }
  }
}
