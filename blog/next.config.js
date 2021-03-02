const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const path = require('path');
if (typeof require !== 'undefined') {
  require.extensions['.scss'] = file => {};
}
module.exports = () => withSass(withCSS({
  // 别名配置
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'api': path.resolve(__dirname, 'src/api'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'pages': path.resolve(__dirname, 'pages'),
      'styles': path.resolve(__dirname, 'src/styles'),
    };
    return config;
  },
}))