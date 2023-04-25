module.exports = {
  stories: [{ directory: '../src' }],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
  webpackFinal: async (config) => {
    config.resolve.alias['airtable'] = require.resolve(
      '../__mocks__/airtable.js'
    );
    return config;
  },
};
