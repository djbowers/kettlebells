import { Outlet } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { Header } from '~/components';

export const Root = () => {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Header />
      <Outlet />
    </QueryParamProvider>
  );
};
