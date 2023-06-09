const path = require('path');

module.exports = {
  entry: './src/app',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/dist'),
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