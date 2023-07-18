const path = require('path');
const glob = require('glob');
const { merge } = require("webpack-merge");
const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extracts css files in different style file on build
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const devConfig = {
  mode: 'production',
  /**
   * will provide full code to review the issues
   * even in production for both js and css
   */
  devtool: 'source-map',
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
    /**
     * this webpack config ( usedExports ) is in charge to tree chaking 
     * means will remove all unused js files and codes
     * from final bundle file. it can decrease the js bundle size
     */
    usedExports: true,
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
      /**
       * plugin to compress and optimisation of images
       */
      new ImageMinimizerPlugin({
        minimizer: {
          // theres a lot of optimizers and here imageminMinify has been used
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['imagemin-mozjpeg', { quality: 40 }],
              ['imagemin-pngquant', {
                quality: [0.65, 0.90],
                speed: 4,
              }],
              ['imagemin-gifsicle', { interlaced: true }],
              ['imagemin-svgo', {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          }
        },
        // to convert file types to specific format
        generator:[
          {
            type: 'asset',
            preset: 'webp-custom-name', // custom name
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              // to change output images format to webp type
              plugins: ['imagemin-webp']
            }
          }
        ]
      })
    ],
    /**
     * this configuration is for split large bundles to the smaller chunks
     * to speed up loading the modules
     */
    splitChunks: {
      cacheGroups: {
        jquery: {
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          chunks: 'initial', // ( async | all )
          name: 'jquery',
        },
        bootstrap: {
          test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
          chunks: 'initial', // ( async | all )
          name: 'bootstrap'
        },
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.module.css$/i,
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
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
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
          filename: './images/[name].[contenthash:12][ext]'
        },
        /** 
         * this rules used to reduced the output image files after build
         * with image-webpack-loader webpack plugin
         * this part commented and ImageMinimizer used in optimization part
         */
        // use: [
        //   {
        //     loader: 'image-webpack-loader',
        //     options: {
        //       // mozjpeg is the jpeg compressor name used by image-webpack-loader
        //       mozjpeg: {
        //         quality: 40,
        //       },
        //       // pngquant is png compressor name
        //       pngquant: {
        //         quality: [0.65, 0.90],
        //         speed: 4, // default value
        //       }
        //     }
        //   }
        // ]

      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:12].css', // 12 is the length of hash (default is 20)
    }),
    /**
     * this webpack plugin will remove all unused css styles 
     * it'w very helpful when using css frameworks 
     * it will clean all unused styles and classes from bundle files
     */
    new PurgeCSSPlugin({
      paths: glob.sync(
        `${path.join(__dirname, '../src')}/**/*`,
        { nodir: true }, // and this rule just searchs for files no directories
      ),
    }),
  ]
}


module.exports = merge(commonConfig, devConfig);