import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title?: ReactNode;
  actions?: ReactNode;
}

export const Page = ({ children, title = null, actions = null }: Props) => {
  return (
    <div className="mx-auto my-2 flex max-w-md flex-col gap-2 rounded-xl px-3 pb-2 pt-1 sm:shadow-lg">
      {title && <div className="text-xl font-semibold">{title}</div>}
      {children}
      {actions && <div className="flex justify-center">{actions}</div>}
    </div>
  );
};
