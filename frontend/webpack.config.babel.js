import path from 'path'
import cors from 'cors'
import { ProvidePlugin, HotModuleReplacementPlugin } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ABOUT_APP from './app.config'

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
            x: 0,
            y: 0,
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
            x: 0,
            y: 0,
            label: 'Rotate',
            type: 'rotate',
            fill: 'orange',
            stroke: 'black',
            limitInput: 1,
            settings: {
              angle: {
                label: 'Angle (-359 - 359) [degree]',
                value: 0,
                defaultValue: 0,
              },
            },
            files: {
              fileId: '',
              fileName: '',
            },
          },
          {
            x: 0,
            y: 0,
            label: 'GaussianBlur',
            type: 'gaussian_blur',
            fill: 'cyan',
            stroke: 'black',
            limitInput: 1,
            settings: {
              sigmaX: {
                label: 'Sigma X (0 - 100) [integer]',
                value: 15,
                defaultValue: 15,
              },
              sigmaY: {
                label: 'Sigma Y (0 - 100) [integer]',
                value: 0,
                defaultValue: 0,
              },
            },
            files: {
              fileId: '',
              fileName: '',
            },
          },
          {
            x: 0,
            y: 0,
            label: 'Resize',
            type: 'resize',
            fill: '#9BFF00',
            stroke: 'black',
            limitInput: 1,
            settings: {
              widthPercent: {
                label: 'Width (0 - 100) [%]',
                value: 0,
                defaultValue: 0,
              },
              heightPercent: {
                label: 'Height (0 - 100) [%]',
                value: 0,
                defaultValue: 0,
              },
            },
            files: {
              fileId: '',
              fileName: '',
            },
          },
          {
            x: 0,
            y: 0,
            label: 'Is Hack Node',
            type: 'debugger',
            fill: 'gold',
            stroke: 'black',
            limitInput: 10,
            settings: {
              fill: {
                label: 'How do you feel?',
                value: 'green',
                default: 'gold',
              },
            },
            files: {
              fileId: '',
              fileName: '',
            },
          },
        ])
      })

      app.get('/', (req, res) => {
        res.render(path.join(__dirname, 'views', 'index.pug'), ABOUT_APP)
      })
    },
  },
}

export default {
  ...devConfig,
  ...prodConfig,
}
