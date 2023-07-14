const { merge } = require("webpack-merge");
const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extracts css files in different style file on build
const path = require('path')

const devConfig = {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:12].css', // 12 is the length of hash (default is 20)
    }),
  ]
}


module.exports = merge(commonConfig, devConfig);