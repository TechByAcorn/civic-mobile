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
        // Default stacks
        sans: ['Inter', 'System'],
        heading: ['ClashGrotesk', 'System'],
      },
      // Example semantic colors (you can adjust based on Figma tokens)
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#0B0F14',
        },
        onSurface: {
          DEFAULT: '#0B0F14',
          dark: '#E6EAF0',
        },
        muted: {
          DEFAULT: '#6B7280',
          dark: '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
};