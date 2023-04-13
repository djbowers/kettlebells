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
  config: {},
});
