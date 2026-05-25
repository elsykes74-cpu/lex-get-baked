import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: { DEFAULT: '#B4ACCC', light: '#D8D2EC', dark: '#8A82AC', faint: '#F0EDF8' },
        blush:    { DEFAULT: '#D4A8B8', light: '#EDD8E4', dark: '#B87890' },
        mauve:    { DEFAULT: '#C0A0B8', light: '#DCCCDC', dark: '#9478A0' },
        pearl:    { DEFAULT: '#FBF7FF', light: '#FFFFFF', dark: '#EDE8F8' },
        rosegold: { DEFAULT: '#D4956A', light: '#E8BA90', dark: '#B87040' },
        cream:    { DEFAULT: '#FFF5E6', light: '#FFFAF5', dark: '#F5E8D0' },
        plum:     { DEFAULT: '#2D1A4A', light: '#4A3260', dark: '#1A0E2C' },
        choco:    { DEFAULT: '#3C2018', light: '#6B4028', dark: '#200E08' },
        rose:     { DEFAULT: '#C9748F', light: '#E8A4B8', dark: '#9E4F6A' },
        gold:     { DEFAULT: '#D4956A', light: '#E8B890', dark: '#B07040' },
        charcoal: { DEFAULT: '#2C2040', light: '#3C3060', dark: '#1A1428' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-bg':           'linear-gradient(145deg, #8878A8 0%, #9C94C0 25%, #B0AACC 55%, #C8C0DC 80%, #DCD6EC 100%)',
        'page-bg':           'linear-gradient(160deg, #9890BC 0%, #A8A4C8 50%, #B8B4D0 100%)',
        'brand-gradient':    'linear-gradient(135deg, #A89CC4 0%, #C9748F 50%, #D4956A 100%)',
        'iridescent':        'linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(210,195,245,0.72) 45%, rgba(255,210,228,0.82) 100%)',
        'rosegold-gradient': 'linear-gradient(135deg, #D4956A 0%, #E8BA90 50%, #C9748F 100%)',
        'card-glass':        'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.28) 100%)',
      },
      boxShadow: {
        'glass':     '0 8px 32px rgba(100,80,160,0.14), inset 0 1px 0 rgba(255,255,255,0.75)',
        'tile':      '0 4px 20px rgba(100,80,160,0.12), inset 0 1px 0 rgba(255,255,255,0.65)',
        'card':      '0 12px 40px rgba(100,80,160,0.18), 0 2px 8px rgba(100,80,160,0.08)',
        'glow':      '0 0 40px rgba(201,116,143,0.45)',
        'glow-gold': '0 0 40px rgba(212,149,106,0.5)',
        'glow-lav':  '0 0 40px rgba(160,140,210,0.5)',
        'btn':       '0 4px 24px rgba(180,140,210,0.32), inset 0 1px 0 rgba(255,255,255,0.95)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-med':  'float 4s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'spin-slow':  'spin 20s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
        'blob':       'blob 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-16px) rotate(2deg)' },
          '66%':      { transform: 'translateY(-7px) rotate(-2deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%':      { opacity: '1', transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '33%':      { borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' },
          '66%':      { borderRadius: '70% 30% 50% 50% / 30% 60% 40% 70%' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};

export default config;
