/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'fade-in-delay-300': 'fadeIn 0.6s ease-out 0.3s forwards',
        'fade-in-delay-500': 'fadeIn 0.6s ease-out 0.5s forwards',
        'fade-in-delay-700': 'fadeIn 0.6s ease-out 0.7s forwards',
        'fade-in-up-delay-1000': 'fadeInUp 0.6s ease-out 1s forwards',
        'fade-in-up-delay-1200': 'fadeInUp 0.6s ease-out 1.2s forwards',
        'fade-in-up-delay-1400': 'fadeInUp 0.6s ease-out 1.4s forwards',
        'fade-in-up-delay-1600': 'fadeInUp 0.6s ease-out 1.6s forwards',
        'fade-in-up-delay-1800': 'fadeInUp 0.6s ease-out 1.8s forwards',
        'fade-in-up-delay-2000': 'fadeInUp 0.6s ease-out 2s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
