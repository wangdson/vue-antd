const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const config = require('./config');
function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      },
    },
    output: {
      path: config.build.assetsRoot,
      filename: '[name].js',
      publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'static'),
          to: config.dev.assetsSubDirectory,
          ignore: ['.*'],
        },
      ]),
    ],
  },
  chainWebpack: (config) => {
  },
};
