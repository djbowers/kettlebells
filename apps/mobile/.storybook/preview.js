import { AllProviders } from '../src/providers';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <AllProviders>
      <Story />
    </AllProviders>
  ),
];
