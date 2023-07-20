const express = require('express');
const app = express();
const path = require('path');

if ( process.env.NODE_ENV === 'development') {
  const WebpackDevMiddleware = require('webpack-dev-middleware');
  const configuration = require('../config/webpack.config.dev');
  const webpack = require('webpack');
  const webpackCompiler = webpack(configuration)
  app.use(
    WebpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
  );
  const webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(webpackCompiler));
}

app.get('/', function (req, res){
  const pathToHtmlFile = path.resolve(__dirname, '../dist/index.html');
  res.sendFile(pathToHtmlFile)
});

app.use('/static', express.static(path.resolve(__dirname, '../dist')))

app.listen(3000, function (){
  console.log("Server is running on port http://localhost:3000")
})
