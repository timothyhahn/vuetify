const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    app: './dev/index.js'
  },
  output: {
    path: resolve('../dev'),
    publicPath: '/dev/',
    library: 'Vuetify'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      vuetify: resolve('../src'),
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loaders: ['vue-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  devServer: {
    contentBase: resolve('../dev')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'development'"
    }),
    new BundleAnalyzerPlugin()
  ]
}
