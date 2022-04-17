const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const babelPolyfill = require("@babel/polyfill");


const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css'
});

const config = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    // removing 'src' directory from entry point, since 'context' is taking care of that
    babelPolyfill: "@babel/polyfill",
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      //babel-loader
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      //html-loader
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      //sass-loader
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src', 'assets', 'scss'),
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'bootstrap/scss')
        ],
        use: extractPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
            // {
            //   loader: 'postcss-loader', // Run post css actions
            //   options: {
            //     plugins: function () { // post css plugins, can be exported to postcss.config.js
            //       return [
            //         require('precss'),
            //         require('autoprefixer')
            //       ];
            //     }
            //   }
            // }
          ],
          fallback: 'style-loader'
        })
      },
      //file-loader(for images)
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './assets/media/'
          }
        }]
      },
      //file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new ESLintPlugin({ useEslintrc: true }),
    new CleanWebpackPlugin(['dist']),
    //html-webpack-plugin instantiation
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    extractPlugin,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })

  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist/assets/media"),
    compress: true,
    port: 3000,
    stats: 'errors-only',
    open: true
  },
  // devtool: 'inline-source-map'
};

module.exports = config;