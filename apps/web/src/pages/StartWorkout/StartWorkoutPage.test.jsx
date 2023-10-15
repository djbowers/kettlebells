import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './StartWorkoutPage.stories';

const { Normal } = composeStories(stories);

describe('start workout page', () => {
  let onStart;

  const defaultOptions = {
    bells: [16, 0],
    minutes: 20,
    notes: '',
    reps: [5],
    tasks: [''],
  };

  beforeEach(() => {
    onStart = vi.fn();
    render(<Normal onStart={onStart} />);
  });

  test('start button is disabled by default', () => {
    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeDisabled();
  });

  test('entering a task name enables start button', async () => {
    const taskInput = screen.getByLabelText('Task Input');
    await userEvent.type(taskInput, 'Clean and Press');

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onStart).toHaveBeenCalledWith({
      ...defaultOptions,
      tasks: ['Clean and Press'],
    });
  });

  test('can enter multiple tasks', async () => {
    const addTaskButton = screen.getByRole('button', { name: '+ Task' });
    await userEvent.click(addTaskButton);

    const taskInputs = screen.getAllByLabelText('Task Input');
    expect(taskInputs).toHaveLength(2);

    await userEvent.type(taskInputs[0], 'Clean and Press');
    await userEvent.type(taskInputs[1], 'Front Squat');

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onStart).toHaveBeenCalledWith({
      ...defaultOptions,
      tasks: ['Clean and Press', 'Front Squat'],
    });
  });
});
