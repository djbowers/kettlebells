import { ChevronRightIcon } from '@radix-ui/react-icons';

import { Button, ButtonProps } from './button';

export default {
  component: Button,
  args: {
    children: 'Click me!',
  },
};

export const Default = {
  name: 'Button',
};

const variants: ButtonProps['variant'][] = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
  'link',
];

const sizes: ButtonProps['size'][] = ['sm', 'default', 'lg', 'icon'];

export const AllButtons = () => (
  <div className="flex gap-2">
    {variants.map((variant) => (
      <div key={variant} className="flex flex-col gap-1">
        {sizes.map((size) => (
          <Button key={`${variant}-${size}`} variant={variant} size={size}>
            {size === 'icon' ? <ChevronRightIcon /> : 'Click me!'}
          </Button>
        ))}
      </div>
    ))}
  </div>
);

export const Loading = () => (
  <div className="flex gap-2">
    {variants.map((variant) => (
      <div key={variant} className="flex flex-col gap-1">
        <Button key={variant} variant={variant} loading={true}>
          Click me!
        </Button>
      </div>
    ))}
  </div>
);
