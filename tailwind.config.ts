import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        text: {
          light: '#1a1a1a',
          dark: '#ffffff',
        }
      },
      keyframes: {
        'progress-right': {
          '0%': { width: '0%', left: '0' },
          '50%': { width: '100%', left: '0' },
          '100%': { width: '0%', left: '100%' }
        },
        'progress-left': {
          '0%': { width: '0%', right: '0' },
          '50%': { width: '100%', right: '0' },
          '100%': { width: '0%', right: '100%' }
        },
        'progress-fade': {
          '0%': { opacity: '0', width: '0%' },
          '50%': { opacity: '1', width: '100%' },
          '100%': { opacity: '0', width: '100%' }
        }
      },
      animation: {
        'progress-right': 'progress-right 1s ease-in-out infinite',
        'progress-left': 'progress-left 1s ease-in-out infinite',
        'progress-fade': 'progress-fade 1s ease-in-out infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
