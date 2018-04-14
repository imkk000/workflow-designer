import path from 'path'
import cors from 'cors'
import { ProvidePlugin, HotModuleReplacementPlugin } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const SRC_DIR = path.join(__dirname, 'src')
const DIST_DIR = path.join(__dirname, 'dist')

const pathsToClean = [DIST_DIR]

const prodConfig = {
  entry: path.join(SRC_DIR, 'webpack.import.js'),
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '/dist/',
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
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
        loader: ['babel-loader', 'eslint-loader'],
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
}

const devConfig = {
  devtool: 'source-map',
  devServer: {
    publicPath: '/dist/',
    contentBase: [SRC_DIR],
    watchContentBase: true,
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    https: false,
    before: app => {
      // NOTE: enable cors
      app.use(cors())

      app.get('/api/nodes', (req, res) => {
        res.send([
          {
            x: 100,
            y: 100,
            label: 'Load Image',
            type: 'load_image',
            fill: 'red',
            stroke: 'black',
            limitInput: 0,
            files: {
              fileId: '',
              fileName: '',
            },
          },
          {
            x: 200,
            y: 250,
            label: 'Rotate',
            type: 'rotate',
            fill: 'orange',
            stroke: 'black',
            limitInput: 1,
            files: {
              fileId: '',
              fileName: '',
            },
          },
          {
            x: 300,
            y: 150,
            label: 'Blur',
            type: 'blur',
            fill: 'cyan',
            stroke: 'black',
            limitInput: 1,
            files: {
              fileId: '',
              fileName: '',
            },
          },
          {
            x: 150,
            y: 350,
            label: 'Resize',
            type: 'resize',
            fill: '#9BFF00',
            stroke: 'black',
            limitInput: 1,
            files: {
              fileId: '',
              fileName: '',
            },
          },
        ])
      })

      app.get('/', (req, res) => {
        res.set('Content-Type', 'text/html')
        res.send('<!DOCTYPE html><html lang="en"><body><script src="/dist/bundle.js"></script></body></html>')
      })
    },
  },
}

export default {
  ...devConfig,
  ...prodConfig,
}
