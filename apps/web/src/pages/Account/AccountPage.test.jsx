import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './AccountPage.stories';

const { Default } = composeStories(stories);

describe('account page', () => {
  beforeEach(() => {
    render(<Default />);
  });

  test("renders user's email address", async () => {
    await screen.findByText('luke@skywalker.com');
  });
});
