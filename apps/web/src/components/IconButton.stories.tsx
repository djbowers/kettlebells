import { PlusIcon } from '@heroicons/react/20/solid';

import { IconButton } from './IconButton';

export default {
  component: IconButton,
};

export const Default = {
  args: {
    children: <PlusIcon className="h-3 w-3" />,
  },
};

export const Outline = {
  args: {
    ...Default.args,
    kind: 'outline',
  },
};

export const Large = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

export const LargeOutline = {
  args: {
    ...Outline.args,
    size: 'large',
  },
};
