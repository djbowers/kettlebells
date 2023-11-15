import { SessionProvider } from '~/contexts';

import { AccountPage } from './AccountPage';

export default {
  component: AccountPage,
  decorators: [
    (Story) => (
      <SessionProvider value={{ user: { email: 'luke@skywalker.com' } }}>
        <Story />
      </SessionProvider>
    ),
  ],
};

export const Default = {};
