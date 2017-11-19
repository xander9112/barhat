const path = require('path'),
  webpack = require('webpack'),
  OptimizeJsPlugin = require('optimize-js-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  extractSCSS = new ExtractTextPlugin('../css/main.css', {allChunks: true}),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin')

function exclude (modules) {
  let pathSep = path.sep
  
  if (pathSep === '\\') {
    pathSep = '\\\\'
  }
  
  const moduleRegExps = modules
    .map(modName => new RegExp(`node_modules${pathSep}${modName}`))
  
  return modulePath => {
    if (/node_modules/.test(modulePath)) {
      for (let i = 0; i < moduleRegExps.length; i++) {
        if (moduleRegExps[i].test(modulePath)) {
          return false
        }
      }
      
      return true
    }
    
    return false
  }
}

module.exports = {
  entry: path.resolve(__dirname, './app/assets/js/index.js'),
  
  output: {
    path: path.resolve(__dirname, './dist/assets/js'),
    filename: 'main.js'
  },
  
  resolve: {
    alias: {
      axios: 'axios/dist/axios.min'
    },
    modules: ['app/assets/js', 'node_modules']
  },
  
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: exclude(['v-img']),
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSCSS.extract({
          fallback: 'style-loader',
          publicPath: '../assets/',
          use: [
            'postcss-loader',
            'css-validator-loader',
            {
              loader: 'sass-loader',
              options: {outputStyle: 'expanded'}
            }
          ]
        })
      }
    ]
  },
  
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        properties: true,
        dead_code: true,
        drop_debugger: true,
        unsafe: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        cascade: true,
        side_effects: true,
        warnings: false
      },
      mangle: {except: ['document']}
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '"production"'},
      'API_PATH': '"http://localhost:1488/api/"'
    }),
    new OptimizeJsPlugin({sourceMap: false}),
    extractSCSS,
    new CopyWebpackPlugin([
      {
        from: 'app/assets/fonts',
        to: '../fonts'
      },
      {
        from: 'app/assets/images',
        to: '../images'
      }
    ]),
    new HtmlWebpackPlugin({
      filename: '../../index.html',
      template: './app/html/index.template.ejs',
      hash: true,
      inject: false
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  
  performance: {
    maxEntrypointSize: 400000,
    assetFilter: assetFilename => assetFilename.endsWith('.js')
  },
  
  stats: {children: false}
}