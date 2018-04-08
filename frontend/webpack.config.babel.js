import path from 'path'
import { ProvidePlugin, HotModuleReplacementPlugin } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const SRC_DIR = path.join(__dirname, 'src')

const prodConfig = {
  entry: path.join(SRC_DIR, 'webpack.import.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/',
  },
  plugins: [
    new CleanWebpackPlugin(),
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0'],
            plugins: ['babel-plugin-transform-class-properties'],
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
    ],
  },
  resolve: {
    extensions: ['.js', '.scss'],
  },
}

const devConfig = {
  devtool: 'source-map',
  devServer: {
    publicPath: '/assets/',
    contentBase: [SRC_DIR],
    watchContentBase: true,
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    https: false,
    before: (app) => {
      app.get('/api/nodes', (req, res) => {
        res.send([
          {
            x: 100,
            y: 100,
            label: 'Load Image',
            fill: 'red',
            stroke: 'black',
          },
          {
            x: 200,
            y: 200,
            label: 'Rotate',
            fill: 'green',
            stroke: 'black',
          },
          {
            x: 150,
            y: 150,
            label: 'Blur',
            fill: 'cyan',
            stroke: 'black',
          },
        ])
      })

      app.get('/', (req, res) => {
        res.render(path.join(__dirname, 'views', 'index.pug'))
      })
    },
  },
}

export default {
  ...devConfig,
  ...prodConfig,
}
