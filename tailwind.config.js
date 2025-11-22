/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0edff',
          100: '#e4deff',
          200: '#cdc1ff',
          300: '#ab96ff',
          400: '#8661ff',
          500: '#6b3cff',
          600: '#4b39ef',
          700: '#3d24d4',
          800: '#331fad',
          900: '#2b1b8a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e6e7e8',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'like-bounce': 'like-bounce 0.6s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in-out': 'fade-in-out 3s ease-in-out infinite',
      },
      keyframes: {
        'like-bounce': {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.3)' },
          '50%': { transform: 'scale(0.9)' },
          '75%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in-out': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
