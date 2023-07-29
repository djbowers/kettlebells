import { render, screen } from '@testing-library/react-native';

import App from './App';

test('app renders', async () => {
  render(<App />);
  await screen.findByText("Let's get started!");
});
