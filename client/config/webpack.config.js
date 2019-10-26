const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../js/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build'),
  },
  devtool: 'inline-source-map',
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules',
        use: ['babel-loader'],
      },

      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
  ],
};