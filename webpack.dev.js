const webpack = require("webpack");
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    index: [
      "./src/index.js"
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
  }
});
