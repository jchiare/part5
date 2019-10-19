const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'manual_build'),
    filename: 'main.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'manual_build'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3003',
    },

  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
}
module.exports = config
