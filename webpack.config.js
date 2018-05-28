const webpack = require('webpack'),
  path = require('path'),
  glob = require('glob-all'),
  srcDir = path.resolve( __dirname, 'src' ),
  publicDir = path.resolve( __dirname, 'public' ),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  PurifyCSSPlugin = require('purifycss-webpack')

module.exports = {
  context: srcDir,
  devtool: 'hidden-source-map',
  entry: {
    script: './index.js'
  },
  output: {
    path: publicDir,
    filename: '[name].js',
    publicPath: './',
    sourceMapFilename: 'main.map'
  },
  devServer: {
    contentBase: publicDir,
    publicPath: '/',
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 3000,
    openPage: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            'postcss-loader?sourceMap',
            'sass-loader?sourceMap'
          ],
          publicPath: './'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|mp4|txt|xml)$/,
        use: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: false,
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, 'src/*.html'),
        path.join(__dirname, 'src/**/*.js')
      ]),
      purifyOptions: { whitelist: ['.fa-github'] }
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'index.html',
      title: 'Webpack Starter Kit - Vanilla JS',
      description: 'Bienvenid@s, esta aplicación fue construida con Webpack, Vanilla JS y la filosofía de los componentes web.',
      favicon: './assets/img/favicon.ico',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      chunks: ['script']
    })
  ]
}
