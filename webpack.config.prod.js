const Config = require('webpack-config').Config;

module.exports = new Config()
  .extend('./webpack.config.js')
  .merge({
    output: {
      path: 'dist',
      filename: 'bundle.js'
    },
  });