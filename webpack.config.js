const path = require('path');

module.exports = {
  entry: './src/app',
  stats: {
    errorDetails: true,
  },
  resolve: {
    extension: ['.js']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
};