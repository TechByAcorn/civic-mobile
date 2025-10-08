/** @type {import('tailwindcss').Config} */
module.exports = {
  // Include paths to all of your component files
  content: [
    './App.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        // Clash Grotesk for impactful titles (all caps usage in brand materials)
        clash: ['ClashGrotesk', 'System'],
        // Inter for UI and supporting information
        inter: ['Inter', 'System'],
        // Dedicated alias for Body text style
        body: ['Inter', 'System'],
        // Default stacks
        sans: ['Inter', 'System'],
        heading: ['ClashGrotesk', 'System'],
      },
      fontSize: {
        // Figma Body / Label size 14 with 150% leading
        label: ['14px', { lineHeight: '21px' }],
      },
      colors: {
        primary: {
          DEFAULT: '#af0604',
        },
        surface: {
          DEFAULT: '#FBF7F3',
        },
        accentBackground: {
          DEFAULT: "#6ED5B8"
        },
        neutral: {
          DEFAULT: "#EEEAE0"
        },
        disabled: {
          DEFAULT: "#BFBFBF"
        },
        muted: {
          DEFAULT: '#D9D9D9',
          dark: '#9CA3AF',
        },
        black: {
          DEFAULT: "#1F1F1F",
        },
        "text-primary": {
          DEFAULT: "#141414"
        },
        "text-secondary": {
          DEFAULT: "#434343"
        },
        "text-white": {
          DEFAULT: "#FFF"
        },
        border: {
          DEFAULT: "#E6E6E7"
        }
      },
    },
  },
  plugins: [],
};