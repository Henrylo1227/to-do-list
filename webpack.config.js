const path = require('path');

module.exports = {
  entry: './client/src/app.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'client/public/dist'),
  },
  resolve:{
    fallback: {
      'path': false,
      'stream': false,
      'buffer': false,
      'crypto': false,
      'http': false,
      'zlib': false,
    },
    }
};