import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    layout: {
      background: '#FFFFFF',
      border: '#E4E4E7', // zinc-200
      panel: '#F4F4F5', // zinc-100
      active: '#004c97', // blue-700
      inverse: '#202945', // blue-900
    },
  },
  space: {
    px: '1px',
    0: '0',
    0.5: '4px', // Rare
    1: '8px',
    1.5: '12px',
    2: '16px',
    2.5: '20px', // Only use for icons
    3: '24px',
    4: '32px', // After this point, 8px steps is too small to be significant, and moves to 16px steps
    5: '48px',
    6: '64px',
    7: '80px',
  },
  config: {},
});
