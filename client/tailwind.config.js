/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const plugin = require('tailwindcss/plugin');
const { gray } = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        gray,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    plugin(({ addVariant, e }) => {
      addVariant('sibling-checked', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          const escaped = e(`sibling-checked${separator}${className}`);
          return `input[type="radio"]:checked + .${escaped}`;
        });
      });
    }),
  ],
};
