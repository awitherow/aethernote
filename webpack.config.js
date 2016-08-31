var webpack = require('webpack');
var path = require('path');

var nodeEnv = process.env.NODE_ENV;

var config = {
  debug: true,
  devtool: nodeEnv === 'production' ? 'cheap-module-eval-source-map' : 'source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    './src/app/index.js',
  ],
  target: 'web',
  output: {
    path: 'public/',
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './src',
  },
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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
