const production = require('./webpack.config.prod.js');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const analyzerConfig = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: true,
    })
  ]
}

module.exports = merge(production, analyzerConfig)