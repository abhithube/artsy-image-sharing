const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new DotenvWebpackPlugin({
      path: path.resolve(__dirname, '.env'),
    }),
  ],
  target: 'web',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  devtool: 'eval-cheap-module-source-map',
});
