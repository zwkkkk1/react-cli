var path = require('path')

module.exports = {
  // 入口 入口文件是 ./src/index.js
  entry: path.join(__dirname, './src/index.js'),
  // 出口 文件会输出到 dist 文件夹，输出的文件名叫 bundle.js
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'src')
      }
    ]
  },

  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
  }
}