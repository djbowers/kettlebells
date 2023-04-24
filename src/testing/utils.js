import { render } from '@testing-library/react-native';

import { AllProviders } from '../providers';

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
