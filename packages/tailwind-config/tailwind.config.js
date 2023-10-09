/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    spacing: {
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
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
      },
    },
  },
  plugins: [],
};
