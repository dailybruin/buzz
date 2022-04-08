const webpack = require("webpack");
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    index: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./src/index.js"
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  }
});
