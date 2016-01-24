module.exports = {
  entry: './js/app.jsx',
  output: {
    filename: './compiled.js'
  },
  module: {
    loaders: [
      {
	test: /\.jsx?$/,
	exclude: /(node_modules|bower_components|server)/,
	loader: 'babel',
	query: {
	  presets: ['es2015', 'react']
	}
      }
    ]
  }
};
