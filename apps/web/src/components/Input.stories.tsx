import { Input } from './Input';

export default {
  component: Input,
  args: {
    onChange: () => {},
  },
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
