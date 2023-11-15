import { Input } from './Input';

export default {
  component: Input,
};

export const Default = {
  args: {
    value: 'Elit elit laborum amet nostrud laboris.',
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
