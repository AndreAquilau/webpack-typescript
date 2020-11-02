require('dotenv').config();

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.MODE,
  entry: './src/index.ts',
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    contentBasePublicPath: '/my-app',
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
  },
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'dist'),
  } ,
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$ | \.ts$ | \.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [
              [
                'module-resolver',
                {
                  alias: {
                    '@config': './src/config',
                    '@services': './src/services',
                  },
                },
              ],
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
            ignore: ['**/*.spec.ts'],
          }
        },
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname, 'public', 'login.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devtool: 'source-map'
};
