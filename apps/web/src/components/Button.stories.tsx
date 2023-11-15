import { Button, ButtonKinds } from './Button';

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

export const DisabledOutline = {
  args: {
    ...Outline.args,
    disabled: true,
  },
};

export const Loading = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const LoadingOutline = {
  args: {
    ...Outline.args,
    loading: true,
  },
};
