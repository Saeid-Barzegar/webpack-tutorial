const { merge } = require("webpack-merge");
const commonConfig = require('./webpack.config.common');
const path = require("path");


const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map', // faster and more code quiality in dev mode
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
        exclude: /\module.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/i,
        include: /\module.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[md4:hash:7]'
              },
            }
          },
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.s(c|a)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|svg)$/i,
        type: 'asset',
        /**
         * this parcel rule will inject the images with less than 10 KB 
         * into the js bundle
         */
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          }
        },
        /**
         * and for files more than 10 KB it will create a new directory with name images
         * and save the images with originam name and extension there
         */
        generator: {
          filename: './images/[name][ext]'
        }
      }
    ]
  }
}


module.exports = merge(commonConfig, devConfig);