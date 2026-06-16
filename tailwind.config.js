/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#1A0A2E',
        card: '#2D1545',
        cardAlt: '#3A1C58',
        orchid: '#9B2D8E',
        rose: '#D4418E',
        blush: '#F28AC4',
        gold: '#F5C842',
        success: '#4ADE80',
        muted: '#C4A7E7',
      },
      boxShadow: {
        glow: '0 0 24px rgba(155, 45, 142, 0.3)',
        'glow-mint': '0 0 24px rgba(212, 65, 142, 0.35)',
        'glow-gold': '0 0 24px rgba(245, 200, 66, 0.25)',
      },
      borderRadius: {
        xl: '16px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-30px) translateX(20px)' },
        },
        floatAlt: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(25px) translateX(-25px)' },
        },
        wick: {
          '0%': { left: '0%' },
          '100%': { left: '100%' },
        },
        fillUp: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
        dotPulse: {
          '0%, 80%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '40%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        floatAlt: 'floatAlt 10s ease-in-out infinite',
        wick: 'wick 6s ease-in-out forwards',
        fillUp: 'fillUp 3s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
