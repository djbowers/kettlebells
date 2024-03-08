import { ChevronRightIcon } from '@radix-ui/react-icons';

import { Button } from './button';

export default {
  component: Button,
  args: {
    children: 'Click me!',
  },
};

export const Default = {};

export const Small = {
  args: {
    size: 'sm',
  },
};

export const Large = {
  args: {
    size: 'lg',
  },
};

export const Icon = {
  args: {
    size: 'icon',
    children: <ChevronRightIcon />,
  },
};
