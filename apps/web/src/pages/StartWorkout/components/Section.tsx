import { ReactNode } from 'react';

export const Section = ({
  actions = null,
  children,
  title,
}: {
  actions?: ReactNode;
  children: ReactNode;
  title?: string;
}) => {
  return (
    <div className="layout flex flex-col gap-y-1">
      <div className="flex items-center gap-x-1">
        <div className="flex w-full items-center justify-between">
          <div className="text-foreground text-base font-medium">{title}</div>
          {actions}
        </div>
      </div>
      {children && <div className="flex flex-col gap-y-2">{children}</div>}
    </div>
  );
};
