import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './StartWorkoutPage.stories';

const { Normal } = composeStories(stories);

test('calls submit handler with correct data', () => {
  const onStart = vi.fn();
  render(<Normal onStart={onStart} />);
  const taskInput = screen.getByLabelText('Task');
  userEvent.type(taskInput, 'Clean and Press');
});
