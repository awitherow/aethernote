const { resolve } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const nodeEnv = process.env.NODE_ENV

module.exports = function(env) {
  return env === 'dev' ? {
    devtool: 'cheap-module-source-map',
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
    ],
  } : {
    devtool: 'inline-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './app/index.js',
    ],
    output: {
      filename: 'index.js',
      path: 'public',
      publicPath: '/',
    },
    devServer: {
      hot: true,
      contentBase: resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    proxy: {
      "/api": "http://localhost:3333",
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
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
}
