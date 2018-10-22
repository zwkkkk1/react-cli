var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}