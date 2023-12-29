import path from 'path';

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require(path.resolve(__dirname, 'src/utils/tailwind-plugins/icon-size')),
    // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
    require('@tailwindcss/typography')({ modifiers: ['sm', 'lg'] }),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/aspect-ratio'),
  ],
};
