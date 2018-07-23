var path = require('path');


module.exports = {
  entry: path.resolve('src','index.js'),
  output: {
    path: path.resolve('build'),
    publicPath: 'build',
    filename: 'index.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
          test: /\.(png|woff|woff2|eot)$/,
          use: ['file-loader']
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  }
};
