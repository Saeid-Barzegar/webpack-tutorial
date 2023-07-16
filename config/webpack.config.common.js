const path = require('path');
/**
 * will generate a new html file in dist folder
 * and will add all scripts and styles automatically to it
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * to clean the dist folder on each build
 * the clean property of webpack only works in prod mode
 * and in output has a bug in dev mode
 * and this plugin will work good in dev as well
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/js/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    /**
     * to clear dist folder in each build
     * simply can be clean: true or
     * with other options
     */
    // clean: {
    //   dry: true,
    //   /**
    //    * this will say to webpack to keep html files 
    //    * and only remove javascript files
    //    * the regex is up to you and can set all depens on your need
    //    */
    //   keep: /\.css/, 
    // },
  },
  module:{
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // the output file name
      template: 'src/template.html' // the template html file address
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [ // to create multiple folder
        '**/*', // default rule of plugin without any configuration
        /**
         * new rule to remove a sample folder contents
         * build directory can be replaced with any custom name
         */ 
        path.join(process.cwd(), 'build/**/*'), 
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'images/motivational-pictures/*.*'
      }]
    })
  ]
}

module.exports = config;