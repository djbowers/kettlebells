module.exports = {
  preset: 'jest-expo',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  setupFiles: ['./config/jest/setupFiles.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
