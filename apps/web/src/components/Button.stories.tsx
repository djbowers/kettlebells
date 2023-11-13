import { Button } from './Button';

export default {
  component: Button,
};

export const Default = {
  args: {
    children: 'Hello, world!',
  },
};

export const Outline = {
  args: {
    ...Default.args,
    kind: 'outline',
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
