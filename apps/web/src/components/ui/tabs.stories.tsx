import { Meta } from '@storybook/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
  component: Tabs,
  args: {
    defaultValue: 'account',
    children: (
      <>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </>
    ),
  },
} satisfies Meta<typeof Tabs>;

export default meta;

export const Default = {};

export const Small = {
  args: {
    children: (
      <>
        <TabsList>
          <TabsTrigger size="sm" value="account">
            Account
          </TabsTrigger>
          <TabsTrigger size="sm" value="password">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </>
    ),
  },
};
