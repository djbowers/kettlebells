/** @type {import('tailwindcss').Config} */

import tailwindConfig from './packages/tailwind-config';

export default {
  presets: [tailwindConfig],
  content: ['./apps/**/*.{js,jsx,ts,tsx}'],
};
