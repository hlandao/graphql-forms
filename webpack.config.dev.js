var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './example/main.js',
  output: { path: __dirname + '/example', filename: 'bundle.js' },
  devtool: 'source-map',
  resolve: {
    extensions: ['','.js','.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
};