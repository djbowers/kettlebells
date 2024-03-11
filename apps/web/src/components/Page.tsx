import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title?: ReactNode;
  actions?: ReactNode;
}

export const Page = ({ children, title = null, actions = null }: Props) => {
  return (
    <div className="mx-auto my-3 flex max-w-lg flex-col gap-2">
      {title && <div className="text-xl font-semibold">{title}</div>}
      {children}
      {actions && <div className="justify-end">{actions}</div>}
    </div>
  );
};
