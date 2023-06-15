const path = require('path');

module.exports = {
  entry: './client/src/app.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './public/dist'),
  },    
};