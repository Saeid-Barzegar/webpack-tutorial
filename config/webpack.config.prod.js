const { merge } = require("webpack-merge");
const path = require('path')
const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extracts css files in different style file on build
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const devConfig = {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js'
  },
  /**
   * by default webpack has it's own optimization rules
   * and by default will compress the output js file
   * but when we adding optimization section it will use this configuration
   * and we need to add separate rule to minify the JS files as well
   * But in webpack 5 these we can add a config to tells webpack 
   * to run default webpack rules as well as new rules
   * The `...` line in first line of minimizer will do that
   */
  optimization: {
    minimize: true,
    minimizer: [
      `...`, // to use default rules as well
      // this CssMinimizerPlugin plugin used to minify the css file in production build
      new CssMinimizerPlugin({ 
        minimizerOptions: {
          preset: [
            "default", // default rule
            {
              // to remove comments in build file
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
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