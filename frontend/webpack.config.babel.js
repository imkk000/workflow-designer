import path from 'path'
import cors from 'cors'
import { ProvidePlugin, HotModuleReplacementPlugin } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ABOUT_APP from './app.config'

const SRC_DIR = path.join(__dirname, 'src')
const DIST_DIR = path.join(__dirname, 'dist')

const pathsToClean = [DIST_DIR]

const prodConfig = {
  entry: path.join(SRC_DIR, 'webpack.import.js'),
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '/editor/',
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views', 'index.pug'),
      templateParameters: ABOUT_APP,
      inject: false,
      hash: true,
    }),
    new HotModuleReplacementPlugin(),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      d3: 'd3',
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0'],
            plugins: [
              'babel-plugin-transform-class-properties',
              [
                'babel-plugin-transform-react-jsx',
                {
                  pragma: 'dom',
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.join(SRC_DIR, 'scss')],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.pug'],
  },
}

const devConfig = {
  devtool: 'source-map',
  devServer: {
    publicPath: '/editor/',
    contentBase: [SRC_DIR],
    watchContentBase: true,
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    https: false,
    before: app => {
      // enable cors
      app.use(cors())

      app.get('/', (req, res) => {
        res.render(path.join(__dirname, 'views', 'index.pug'), {
          dev: true,
          ...ABOUT_APP,
        })
      })
    },
  },
}

export default {
  ...devConfig,
  ...prodConfig,
}
