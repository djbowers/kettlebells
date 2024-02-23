import clsx from 'clsx';

interface Props {
  label: string;
  className?: string;
  status?: 'default' | 'warning';
  size?: 'default' | 'small';
}

export const Badge = ({
  label,
  className,
  status = 'default',
  size = 'default',
}: Props) => {
  const classes = clsx(
    'inline-flex items-center whitespace-nowrap rounded-full px-[6px] py-[2px] text-center font-bold leading-none',
    {
      // Colors
      'bg-layout-darker text-default': status === 'default',
      'bg-status-warning text-inverse': status === 'warning',

      // Sizes
      'text-base': size === 'default',
      'text-xs': size === 'small',
    },
    className,
  );
  return <span className={classes}>{label}</span>;
};
