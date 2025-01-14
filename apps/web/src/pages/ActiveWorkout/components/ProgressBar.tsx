import clsx from 'clsx';
import { ReactNode } from 'react';

interface ProgressBarProps {
  color?: 'success' | 'warning';
  completedPercentage: number;
  description?: string;
  size?: 'default' | 'large';
  value?: string;
}

export const ProgressBar = ({
  color = 'success',
  completedPercentage,
  description,
  size = 'default',
  value,
}: ProgressBarProps) => {
  return (
    <div
      className={clsx(
        'bg-accent text-accent-foreground relative flex w-full rounded-xl',
        {
          'h-5': size === 'default',
          'h-6': size === 'large',
        },
      )}
    >
      <div
        className={clsx('rounded-xl', {
          // Color
          'bg-status-success': color === 'success',
          'bg-status-warning': color === 'warning',

          // Size
          'h-5': size === 'default',
          'h-6': size === 'large',
        })}
        style={{ width: `${completedPercentage}%` }}
      />
      <div
        className={clsx(
          'text-foreground absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 font-mono font-medium',
          {
            'text-xl': size === 'default',
            'text-3xl': size === 'large',
          },
        )}
      >
        {value ?? <>&infin;</>}
      </div>
      {description && (
        <span className="text-muted-foreground absolute right-0 top-1/2 mr-2 -translate-y-1/2 text-sm uppercase">
          {description}
        </span>
      )}
    </div>
  );
};
