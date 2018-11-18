const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client.js',
  output: {
    path: path.resolve('.', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  externals: {
    'lodash': '_'
  }
}



