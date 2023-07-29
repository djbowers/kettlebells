module.exports = {
  expo: {
    name: 'kettlebod',
    slug: 'kettlebod',
    version: '1.0.0',
    orientation: 'portrait',
    extra: {
      storybookEnabled: process.env.STORYBOOK_ENABLED,
      eas: {
        projectId: '9424b3d3-5d3d-42ee-be61-0f1d6df2798a',
      },
    },
    ios: {
      bundleIdentifier: 'com.djbowers.kettlebod',
      supportsTablet: false,
    },
  },
};
