import { StoryFn } from '@storybook/react';
import React from 'react';

import { Layout } from '../src/components';
import '../src/tailwind.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story: StoryFn) => {
      return (
        <Layout>
          <Story />
        </Layout>
      );
    },
  ],
};

export default preview;
