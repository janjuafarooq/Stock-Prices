const webpack = require('webpack');
const path = require("path");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const host = 'localhost';
const port = 3001;

module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: './app.js',
    html: './index.html'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:
        {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        loader: 'file?name=styles/[name].[ext]',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css!sass")
      },
    ],
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://' + host + ':' + port,
      browser: 'google chrome'
    }),
    new ExtractTextPlugin('./dist/main.css', {
      allChunks: true
    })
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '/dist'),
  },
  devServer: {
    host: host,
    port: port
  }
};