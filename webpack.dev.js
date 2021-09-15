const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common(), {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, 'dist'),
    hot: true // hot reload
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test page'
    }),
    new webpack.HotModuleReplacementPlugin() // hot reload
  ]
})
