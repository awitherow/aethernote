var webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin')

var nodeEnv = process.env.NODE_ENV

var config = {
  devtool: nodeEnv === 'production' ? 'cheap-module-source-map' : 'inline-eval-cheap-source-map',
  entry: [
    'promise-polyfill',
    'whatwg-fetch',
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
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
  ],
}

if (nodeEnv === 'production') {
  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
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
