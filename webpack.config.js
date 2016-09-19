var path = require('path');
var webpack = require('webpack');

module.exports = {
   devServer: {
      inline: true,
      contentBase: './src',
      port: 8080
   },
   devtool: 'cheap-module-eval-source-map',
   context: path.join(__dirname, "dev"),
   entry: './js/index.js',
   module: {
      loaders: [
         {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
               presets: ['react', 'es2015', 'stage-0'],
               plugins: ['transform-decorators-legacy']
            }
         },
         {
            test: /\.scss/,
            loader: 'style-loader!css-loader!sass-loader'
         }
      ]
   },
   output: {
      path: 'src',
      filename: 'js/bundle.min.js'
   },
   plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
   ]
};
