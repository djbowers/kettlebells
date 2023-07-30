/** @type {import('tailwindcss').Config} */

import tailwindConfig from '../../packages/tailwind-config'

export default {
  presets: [tailwindConfig],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
}
