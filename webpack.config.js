const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const webpackMerge = require('webpack-merge')

const baseConfig = function(env) {
  return {
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'index.js',
      publicPath: '/public/',
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
            publicPath: "/public/",
          }),
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.css'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(env) },
      }),
      new ExtractTextPlugin({
        filename: "bundle.css",
        disable: false,
        allChunks: true,
      }),
    ],
  }
}

module.exports = function(env) {
  return webpackMerge(baseConfig(env), env === 'development' ? {
    devtool: 'cheap-module-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './app/index.js',
    ],
    devServer: {
      hot: true,
      publicPath: '/public/',
      proxy: {
        "/api/**": "http://localhost:3333",
        "/auth/**": "http://localhost:3333",
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  } : {
    devtool: 'inline-source-map',
    entry: [
      './app/index.js',
    ],
    plugins: [
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
  })
}
