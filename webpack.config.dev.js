var webpack = require('webpack')
var path = require('path')
var CompressionPlugin = require('compression-webpack-plugin')

var nodeEnv = process.env.NODE_ENV

var config = {
  devtool: nodeEnv === 'production' ? 'cheap-module-source-map' : 'inline-eval-cheap-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'promise-polyfill',
    './app/index.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js',
    publicPath: '/public/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.css'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
  ],
}

module.exports = config
