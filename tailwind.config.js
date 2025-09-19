/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        'neutral-light': '#F5F5F5',
        'neutral-gray': '#E8E8E8',
        'primary-blue': '#3B82F6',
        'primary-emerald': '#10B981',
        'secondary-beige': '#F5F5DC',
        'secondary-sand': '#C2B280',
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}