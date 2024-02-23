import { Meta } from '@storybook/react';

import { Badge } from './Badge';

export default {
  component: Badge,
  args: {
    label: '1',
    size: 'default',
    status: 'default',
  },
} as Meta;

export const Default = {};

export const Small = {
  args: {
    size: 'small',
  },
};
