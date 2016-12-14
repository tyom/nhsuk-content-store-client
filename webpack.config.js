const Config = require('webpack-config').Config;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const colorFunction = require('postcss-color-function');
const postcssHidden = require('postcss-hidden');
const postcssSize = require('postcss-size');
const postcssPosition = require('postcss-position');
const lostCss = require('lost');

const extractCss = new ExtractTextPlugin('styles.css');


module.exports = new Config()
  .merge({
    entry: './src/index.js',
    output: {
      publicPath: '/'
    },
    devtool: 'source-map',
    devServer: {
      contentBase: 'src/',
      historyApiFallback: true,
      stats: {
        chunks: false,
        children: false
      },
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          include: /src|example/,
          loader: extractCss.extract('style',
            'css?modules&localIdentName=[local]_[hash:base64:4]!postcss')
        },
        {
          test: /\.css$/,
          include: /dist/,
          loader: extractCss.extract('style',
            'css?sourceMap!postcss?sourceMap')
        },
        {
          test: /\.jsx?$/,
          include: [
            /node_modules\/react-icons/,
            /src|example/
          ],
          loader: 'babel'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({template: './src/index.html'}),
      extractCss
    ],
    postcss: () => [
      autoprefixer({
        browsers: ['> 10%', 'last 2 versions']
      }),
      colorFunction,
      postcssHidden,
      postcssSize,
      postcssPosition,
      precss,
      lostCss
    ],
  });
