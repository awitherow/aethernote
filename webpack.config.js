var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var nodeEnv = process.env.NODE_ENV;

var config = {
  devtool: nodeEnv === 'production' ? 'cheap-module-source-map' : 'source-map',
  entry: {
    index: './app/index.js',
  },
  output: {
    path: 'public/',
    filename: '[name].js',
    chunkFilename: "[id].js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react'] },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
  ],
};

if (nodeEnv === 'production') {
  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: false,
      comments: false,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify("production") },
    }),
  ]);
}

module.exports = config;
