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
      // Semantic spacing tokens for consistent layout across the app
      spacing: {
        screen: '20px',      // horizontal screen padding
        section: '24px',     // vertical section spacing
        sectionLg: '32px',   // larger section spacing
        item: '12px',        // gaps between small items
        label: '6px',        // label/helper spacing
        input: '44px',       // input height
        tiny: '4px',
        medium: '8px',
        container: '16px',
      },
      colors: {
        primary: {
          DEFAULT: '#af0604',
        },
        brandPrimary: {
          DEFAULT: "#D72638"
        },
        surface: {
          DEFAULT: '#FAFAFA',
        },
        accentPrimary: {
          DEFAULT: "#EEB027"
        },
        accentBackground: {
          DEFAULT: "#6ED5B8"
        },
        positiveBackground: {
          DEFAULT: "#52A08A"
        },
        neutralBackground: {
          DEFAULT: "#FBF7F3"
        },
        neutral: {
          DEFAULT: "#EEEAE0"
        },
        disabled: {
          DEFAULT: "#BFBFBF"
        },
        disabledPrimary: {
          DEFAULT: "#8C8C8C"
        },
        muted: {
          DEFAULT: '#D9D9D9',
          dark: '#9CA3AF',
        },
        black: {
          DEFAULT: "#1F1F1F",
        },
        darkBlack: {
          DEFAULT: "#000"
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
        "text-midWhite": {
          DEFAULT: "#FAFAFA"
        },
        inputBorder: {
          DEFAULT: "#D0D0D1",
        },
        border: {
          DEFAULT: "#E6E6E7"
        },
        negativeSecondary: {
          DEFAULT: "#FFE4E9"
        },
        negativePrimary: {
          DEFAULT: "#BE124E",
        }
      },
    },
  },
  plugins: [],
};