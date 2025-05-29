import type { Meta, StoryObj } from '@storybook/react';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

const meta = {
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Developer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Inactive</TableCell>
          <TableCell>Designer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Widget A</TableCell>
          <TableCell>$10.00</TableCell>
          <TableCell>5</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Widget B</TableCell>
          <TableCell>$15.00</TableCell>
          <TableCell>3</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>$95.00</TableCell>
          <TableCell>8</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
