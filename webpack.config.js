const path = require('path');

module.exports = {
  entry: './src/app',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  resolve: {
    fallback: {
      util: require.resolve("util/")
    }
  },
  target:'node',
};