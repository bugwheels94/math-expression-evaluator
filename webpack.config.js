const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const PROD = (process.env.NODE_ENV === 'production')
module.exports = {
  mode: 'production',
  entry: './src/formula_evaluator.js',
  output: {
    path: path.join(__dirname, './dist/browser'),
    filename: PROD ? 'math-expression-evaluator.min.js' : 'math-expression-evaluator.js',
    library: {
      name: 'Mexp',
      type: 'umd'
    }
  },
  optimization: {
    minimize: PROD,
    minimizer: [
      new TerserPlugin({ parallel: true })
    ]
  }
}
