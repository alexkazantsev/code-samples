const env = require('./env-config');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    'babel-plugin-styled-components',
    ['import', { 'libraryName': 'antd', 'style': 'css' }],
    ['transform-define', env],
  ],
};
