import { Outlet } from 'react-router-dom';

import { Header, Page } from '~/components';

export const Root = () => {
  return (
    <>
      <Header />
      <Page>
        <Outlet />
      </Page>
    </>
  );
};
