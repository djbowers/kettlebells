import { Outlet } from 'react-router-dom';

import { Header, Page } from '~/components';

export const Root = () => {
  return (
    <Page>
      <Header />
      <div className="mt-2 px-3">
        <Outlet />
      </div>
    </Page>
  );
};
