import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './StartWorkoutPage.stories';

const { Normal } = composeStories(stories);

describe('start workout page', () => {
  let onStart;

  const defaultOptions = {
    bells: [16, 0],
    duration: 20,
    movements: [''],
    notes: '',
    repScheme: [5],
  };

  beforeEach(() => {
    onStart = vi.fn();
    render(<Normal onStart={onStart} />);
  });

  test('start button is disabled by default', () => {
    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeDisabled();
  });

  test('entering a movement name enables start button', async () => {
    const movementInput = screen.getByLabelText('Movement Input');
    await userEvent.type(movementInput, 'Clean and Press');

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onStart).toHaveBeenCalledWith({
      ...defaultOptions,
      movements: ['Clean and Press'],
    });
  });

  test('can enter multiple movements', async () => {
    const addMovementButton = screen.getByRole('button', {
      name: '+ Additional Movement',
    });
    await userEvent.click(addMovementButton);

    const movementInputs = screen.getAllByLabelText('Movement Input');
    expect(movementInputs).toHaveLength(2);

    await userEvent.type(movementInputs[0], 'Clean and Press');
    await userEvent.type(movementInputs[1], 'Front Squat');

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onStart).toHaveBeenCalledWith({
      ...defaultOptions,
      movements: ['Clean and Press', 'Front Squat'],
    });
  });
});
