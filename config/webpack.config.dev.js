const { merge } = require("webpack-merge");
const commonConfig = require('./webpack.config.common');
const path = require("path");


const devConfig = {
  mode: 'development',
  output: {
    filename: 'main.js'
  },
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, '../dist'), // to specify root directory
    },
    devMiddleware: {
      index: 'index.html', 
      writeToDisk: true, // says to webpack write the files to the disk instead of keeping in memory
    },
    client: {
      overlay: true, // shows the errors on whole screen on any error or warnings
    },
    liveReload: false, // to turn off hot module reloading on change
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}


module.exports = merge(commonConfig, devConfig);