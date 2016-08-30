var webpack = require('webpack');

var nodeEnv = process.env.NODE_ENV;

var config = {
  devtool: nodeEnv === 'production' ? 'cheap-module-source-map' : 'source-map',
  entry: './app/index.js',
  output: {
    path: 'public/',
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react'] },
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ],
  },
};

if (nodeEnv === 'production') {
  config.plugins = [].concat([
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
