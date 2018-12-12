const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  mode: 'production',
  cache: false,
  devtool: 'source-map',

  entry: {
    main: './src/main.scss'
  },

  output: {
    path: path.resolve(__dirname, './dist/webpack'),
    publicPath: '/'
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ],

  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: [
            { loader: 'style-loader', options: { sourceMap: true } }
          ],
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'resolve-url-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      }
    ]
  }
};

module.exports = config;
