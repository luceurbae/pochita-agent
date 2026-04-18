const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.mjs'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'main.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/homepage.html',
      filename: 'index.html',
      inject: false
    })
  ],
  devServer: {
    static: './dist',
    port: 8081,
    hot: true,
    open: false
  },
  mode: 'development'
};