var webpack = require('webpack');

var nodeEnv = process.env.NODE_ENV;

var config = {
  devtool: nodeEnv === 'production' ? 'cheap-module-source-map' : 'source-map',
  entry: [
    './app/index.js',
  ],
  output: {
    path: 'public/',
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'react-hot', 'babel'],
      },
    ],
  },
  plugins: [],
};

if (nodeEnv === 'development') {
  addHotLoadServers();
  defineDevelopmentPlugins();
}

if (nodeEnv === 'production') {
  defineProductionPlugins();
}

function addHotLoadServers() {
  let devServer = [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
  ];

  for (var i = 0, len = devServer.length; i < len; i++) {
    config.entry.unshift(devServer[i]);
  }
}

function defineProductionPlugins() {
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

function defineDevelopmentPlugins() {
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]);
}

module.exports = config;
