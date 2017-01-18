var webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var nodeEnv = process.env.NODE_ENV

var config = {
  devtool: nodeEnv === 'production' ? 'cheap-module-source-map' : 'inline-eval-cheap-source-map',
  entry: [
    'promise-polyfill',
    './app/index.js',
  ],
  output: {
    path: 'public',
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader",
          publicPath: "/public",
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
    new ExtractTextPlugin({
      filename: "bundle.css",
      disable: false,
      allChunks: true,
    }),
  ],
}

if (nodeEnv === 'production') {
  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ])
}

module.exports = config
