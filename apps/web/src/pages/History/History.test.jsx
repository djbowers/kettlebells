import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './History.stories';

const { Normal } = composeStories(stories);

test('renders correctly', async () => {
  render(<Normal />);

  expect(
    await screen.findByText('Clean and Press', { exact: false }),
  ).toBeInTheDocument();
});
