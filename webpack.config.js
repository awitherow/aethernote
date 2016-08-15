module.exports = {
  devtool: 'eval',
  entry: './app/main.js',
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
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
