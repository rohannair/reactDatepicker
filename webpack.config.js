/**
 * Webpack Configuration
 * =====================
 *
 * Date: June 2nd, 2015
 * Author: Rohan Nair - Terapeak Engineering
 * Notes:
 *   This config is written in ES5 because I can't be bothered to figure out
 *   the ES6 switches in Node.js, and to ensure that it works in any Node.js
 *   environment.
 *
 *   The actual application is written in some ES6, mixed with JSX. Babel is
 *   my ES6 transpiler, and Webpack also runs my JSX and SCSS compilers.
 *
 */

const webpack = require('webpack');
const path = require('path');

const config = {

  entry:  ['./src/main.js'],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },

  module: {
    loaders: [

    // Transpile ES6 JSX to ES5 JS
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      loaders: [ 'jsx-loader?harmony', 'babel']  },

    // Transpiling ES6 JS to ES5 JS
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },

    // Linting es6 code
    // {
    //   test: /\.js$/,
    //   exclude: /node_modules/,
    //   loader: "eslint-loader"
    // },

    // Sass
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: 'style!css!sass'
    }]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|it|ja|zh\-cn|zh\-tw/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}

module.exports = config;
