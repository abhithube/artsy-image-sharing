/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { DefinePlugin } = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new DefinePlugin({
      'process.env': {
        S3_BUCKET_ENDPOINT: `${process.env.CLIENT_URL}/uploads`,
        SERVER_URL: process.env.SERVER_URL,
      },
    }),
  ],
  target: 'web',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['.gitpod.io'],
    historyApiFallback: true,
    hot: true,
    client: {
      logging: 'warn',
    },
  },
  devtool: 'eval-source-map',
});
