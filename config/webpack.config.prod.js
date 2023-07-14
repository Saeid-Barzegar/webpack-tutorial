const { merge } = require("webpack-merge");
const path = require('path')
const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extracts css files in different style file on build

const devConfig = {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.module.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.css$/i,
        include: /\.module.css$/,
        use: [ 
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64]'
              },
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:12].css', // 12 is the length of hash (default is 20)
    }),
  ]
}


module.exports = merge(commonConfig, devConfig);